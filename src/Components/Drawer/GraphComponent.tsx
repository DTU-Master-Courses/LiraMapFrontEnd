import "../Drawer/DrawerComponents.css";
import "../Utils/client-request-headers";
import { FC, useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ClientRequestHeaders from "../Utils/client-request-headers";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

  const fetchGraphContent = async () => {
    const accelerationResponse = await fetch(
      `http://localhost:8000/trips/list_of_variables/${graphTripID}`,
      { headers: ClientRequestHeaders }
    );
    const acceleration = await accelerationResponse.json();

    setGraphContent(acceleration);
  };

  const fetchTripDetails = async () => {
    const tripDetailsResponse = await fetch(
      `http://localhost:8000/trips/id/${graphTripID}`,
      { headers: ClientRequestHeaders }
    );
    const tripDetails = await tripDetailsResponse.json();

    setTripDetailsContent(tripDetails);
  };

  useEffect(() => {
    fetchGraphContent();
    fetchTripDetails();
  }, []);

  let xValues = [];
  let yValues = [];
  let zValues = [];
  let timestamps = [];
  let date;
  try {
    if (graphContent) {
      date = graphContent[0]["ts_date"];
      for (let i = 0; i < graphContent.length; i++) {
        xValues[i] = graphContent[i]["ax"];
        yValues[i] = graphContent[i]["ay"];
        zValues[i] = graphContent[i]["az"];
        timestamps[i] =
          graphContent[i]["ts_time"];
      }
    }
  } catch (err) {
    console.log(err);
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
        valueHTML.push(<Typography>NULL</Typography>);
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
          tripDetailsValuesHTML.push(<Typography>NULL</Typography>);
        } else {
          tripDetailsValuesHTML.push(<Typography>{String(value)}</Typography>);
        }
        if (key == "start_position_city") {
          handleSubAccordion(
            key,
            startPositionKeysHTML,
            startPositionValuesHTML
          );
        } else if (key == "end_position_city") {
          handleSubAccordion(key, endPositionKeysHTML, endPositionValuesHTML);
        }
      });
    }
  } catch (err) {}

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: "Acceleration-x",
        data: xValues,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Acceleration-y",
        data: yValues,
        borderColor: "rgb(100, 99, 158)",
        backgroundColor: "rgba(100, 99, 158, 0.5)",
      },
      {
        label: "Acceleration-z",
        data: zValues,
        borderColor: "rgb(0, 255, 0)",
        backgroundColor: "rgba(0, 255, 0, 0.5)",
      },
    ],
  };

  return (
    <div>
      <Line
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top" as const,
            },
            title: {
              display: true,
              text: [`Trip: ${graphTaskID}`, date],
            },
          },
        }}
        data={data}
      />
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
