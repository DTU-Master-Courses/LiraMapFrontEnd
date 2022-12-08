// Main Dev: CookieNess
// Supporting Devs: Gustav, johalexander, PossibleNPC
import "../Drawer/DrawerComponents.css";
import "../Utils/client-request-headers";
import {InputLabel, MenuItem} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import ClientRequestHeaders from "../Utils/client-request-headers";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  Select,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GraphChart from "../GraphChart/GraphChart";
import HOSTNAME from "../Utils/hostname";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GraphComponentProps {
  graphTaskID: number;
  graphTripID: string;
}

const GraphComponent: FC<GraphComponentProps> = ({
  graphTaskID,
  graphTripID,
}) => {
  const [graphContent, setGraphContent] = useState<any>();
  const [tripDetails, setTripDetailsContent] = useState<any>();
  const [measurementTypes, setMeasurementTypes] = useState<string[]>([]);
  const [selectedMeasurementType, setSelectedMeasurementType] = useState<string>("");

  const fetchInitialGraphContent = async () => {
    const accelerationResponse = await fetch(
      `http://${HOSTNAME}:8000/trips/acceleration/${graphTripID}`,
      { headers: ClientRequestHeaders }
    );
    const acceleration = await accelerationResponse.json();

    setGraphContent(acceleration["acceleration"]);
  };

  const fetchMeasurementTypes = async () => {
    const measurementResponse = await fetch(
        `http://${HOSTNAME}:8000/measurement/types`,
        { headers: ClientRequestHeaders }
    );
    const measurementTypes = await measurementResponse.json();

    let all_types: string[] = [];

    measurementTypes["measurement_types"].forEach((measurement: any) => {
      all_types.push(measurement["type"]);
    })

    setMeasurementTypes(all_types);
  };

  const fetchMeasurementGraphContent = async () => {
    const measurementsResponse = await fetch(
        `http://${HOSTNAME}:8000/trips/id/${graphTripID}?tag=${selectedMeasurementType}`,
        { headers: ClientRequestHeaders }
    );

    const measurements = await measurementsResponse.json();

    setGraphContent(measurements);
  }

  const fetchTripDetails = async () => {
    const tripDetailsResponse = await fetch(
      `http://${HOSTNAME}:8000/trips/id/${graphTripID}`,
      { headers: ClientRequestHeaders }
    );
    const tripDetails = await tripDetailsResponse.json();

    setTripDetailsContent(tripDetails);
  };

  useEffect(() => {
    fetchInitialGraphContent();
    fetchTripDetails();
    fetchMeasurementTypes();
  }, []);

  useEffect(() => {
    fetchMeasurementGraphContent();
  }, [selectedMeasurementType])

  const handleMeasurementSelection = (event: any) => {
    setSelectedMeasurementType(event.target.value);
  }

  const tripDetailsKeysHTML: any = [];
  const tripDetailsValuesHTML: any = [];
  const startPositionKeysHTML: any = [];
  const startPositionValuesHTML: any = [];
  const endPositionKeysHTML: any = [];
  const endPositionValuesHTML: any = [];

  const handleSubAccordion = (keyID: string, keyHTML: any, valueHTML: any) => {
    const jsonConvert = JSON.parse(tripDetails[keyID]);
    Object.entries(jsonConvert).forEach(([key, value]) => {
      keyHTML.push(<Typography>{key}</Typography>);
      if (value == null) {
        valueHTML.push(<Typography>Empty</Typography>);
      } else {
        valueHTML.push(<Typography>{String(value)}</Typography>);
      }
    });
  };
  try {
    if (tripDetails) {
      Object.entries(tripDetails).forEach(([key, value]) => {
        tripDetailsKeysHTML.push(<Typography>{key}</Typography>);
        if (value == null) {
          tripDetailsValuesHTML.push(<Typography>Empty</Typography>);
        } else {
          tripDetailsValuesHTML.push(<Typography>{String(value)}</Typography>);
        }
        if (key == "start_position_display") {
          handleSubAccordion(
            key,
            startPositionKeysHTML,
            startPositionValuesHTML
          );
        } else if (key == "end_position_display") {
          handleSubAccordion(key, endPositionKeysHTML, endPositionValuesHTML);
        }
      });
    }
  } catch (err) {}

  return (
    <div>
      {/* This is where we are going to add the stupid dropdown menu*/}
      <FormControl>
        <InputLabel id="demo-simple-select-label">MeasurementType</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedMeasurementType}
            label="Measurement Type"
            onChange={handleMeasurementSelection}
        >
          {/*This is where we need to make this dynamic... ALL THE DAMN THINGS*/}
          {
            measurementTypes?.map(measurement => (
              <MenuItem value={measurement}>{measurement}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <GraphChart graphContent={graphContent} graphTaskID={graphTaskID} />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Trip Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="trip_details_wrapper">
            <div className="trip_key_column">
              {tripDetailsKeysHTML.slice(0, 6)}
            </div>
            <div className="trip_value_column">
              {tripDetailsValuesHTML.slice(0, 6)}
            </div>
          </div>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{tripDetailsKeysHTML[6]}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="trip_details_wrapper">
                <div className="trip_key_column">{startPositionKeysHTML}</div>
                <div className="trip_value_column">
                  {startPositionValuesHTML}
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <div className="trip_details_wrapper">
            <div className="trip_key_column">
              {tripDetailsKeysHTML.slice(7, 9)}
            </div>
            <div className="trip_value_column">
              {tripDetailsValuesHTML.slice(7, 9)}
            </div>
          </div>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{tripDetailsKeysHTML[9]}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="trip_details_wrapper">
                <div className="trip_key_column">{endPositionKeysHTML}</div>
                <div className="trip_value_column">{endPositionValuesHTML}</div>
              </div>
            </AccordionDetails>
          </Accordion>
          <div className="trip_details_wrapper">
            <div className="trip_key_column">
              {tripDetailsKeysHTML.slice(10, 16)}
            </div>
            <div className="trip_value_column">
              {tripDetailsValuesHTML.slice(10, 16)}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default GraphComponent;
