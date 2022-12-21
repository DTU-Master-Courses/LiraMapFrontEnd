// Main Dev: CookieNess
// Supporting Devs: Gustav, johalexander, PossibleNPC, ViktorRindom
import "../Drawer/DrawerComponents.css";
import "../Utils/client-request-headers";
import { Autocomplete, TextField } from "@mui/material";
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
import useDebounce from "../../Hooks/UseDebounce";
import OtherGraph from "../OtherGraph/OtherGraph";
import ClientRequestHeaders from "../Utils/client-request-headers";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GraphChart from "../GraphChart/GraphChart";
import HOSTNAME from "../Utils/hostname";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

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
  initData: any;
}

const GraphComponent: FC<GraphComponentProps> = ({
  graphTaskID,
  graphTripID,
    initData
}) => {
  const [graphContent, setGraphContent] = useState<any>();
  const [initialData, setInitialData] = useState<any>(initData);
  const [tripDetails, setTripDetailsContent] = useState<any>();
  const [measurementTypes, setMeasurementTypes] = useState<string[]>([]);
  const [selectedMeasurementType, setSelectedMeasurementType] =
    useState<string | null>("");
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const debouncedSearchTerm = useDebounce<string | null>(selectedMeasurementType, 250);

  const fetchMeasurementTypes = async () => {
    const measurementResponse = await fetch(
      `http://${HOSTNAME}:8000/measurement/types`,
      { headers: ClientRequestHeaders }
    );
    const measurementTypes = await measurementResponse.json();

    let all_types: string[] = [];

    measurementTypes["measurement_types"].forEach((measurement: any) => {
      if (measurement["type"] !== "acc.xyz") {
        all_types.push(measurement["type"]);
      }
    });

    setMeasurementTypes(all_types);
  };

  const fetchMeasurementGraphContent = async (selectedMeasurementTypeInnerHTML: string) => {
    const measurementsResponse = await fetch(
      `http://${HOSTNAME}:8000/trips/id/${graphTripID}?tag=${selectedMeasurementTypeInnerHTML}`,
      { headers: ClientRequestHeaders }
    );

    if (!measurementsResponse.ok) {
      toast.error("Data not found", {
                  position: "top-right",
                  autoClose: 2500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: false,
                  progress: undefined,
                  theme: "light",
                });
      return;
    }

    const measurements = await measurementsResponse.json();

    return measurements;
  };

  const fetchTripDetails = async () => {
    const tripDetailsResponse = await fetch(
      `http://${HOSTNAME}:8000/trips/id/${graphTripID}`,
      { headers: ClientRequestHeaders }
    );
    const tripDetails = await tripDetailsResponse.json();

    setTripDetailsContent(tripDetails);
  };

  useEffect(() => {
    fetchTripDetails();
    fetchMeasurementTypes();
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      handleMeasurementSelection();
    }
  }, [debouncedSearchTerm]);

  const handleMeasurementSelection = async () => {
    if (debouncedSearchTerm) {
      const results = await fetchMeasurementGraphContent(debouncedSearchTerm);
      if (results) {
        setGraphContent(results);
        setIsInitialLoad(false);
      }
    }
  };

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
      <ToastContainer style={{ overflowX: "hidden" }} />
      <Autocomplete
        style={{ marginTop: "1rem", marginLeft: "1rem" }}
        disablePortal
        id="measurement-type-combo-box"
        options={measurementTypes}
        getOptionLabel={(measurementType) => measurementType}
        sx={{ width: 400 }}
        onChange={(event: any, newValue: string | null) => {
          setSelectedMeasurementType(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Measurement Type" />
        )}
      />
      {isInitialLoad ? (
        <GraphChart graphContent={initialData} graphTaskID={graphTaskID} />
      ) : (
        <OtherGraph graphContent={graphContent} graphTaskID={graphTaskID} />
      )}
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
