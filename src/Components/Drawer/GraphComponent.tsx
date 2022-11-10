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
import { useQuery } from "@tanstack/react-query";
import ClientRequestHeaders from "../Utils/client-request-headers";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@material-ui/core";
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
    graphTaskID: number,
    graphTripID: string
}

const GraphComponent: FC<GraphComponentProps> = ({ graphTaskID, graphTripID }) => {
    const [graphContent, setGraphContent] = useState<any>();
    const [tripDetails, setTripDetailsContent] = useState<any>();

  const fetchGraphContent = async () => {
    const accelerationResponse = await fetch(
      `http://localhost:8000/trips/acceleration/${graphTripID}`,
      { headers: ClientRequestHeaders }
    );
    const acceleration = await accelerationResponse.json();

    return Promise.resolve(acceleration);
  };

  const fetchTripDetails = async() => {
      const tripDetailsResponse = await fetch(`http://localhost:8000/trips/id/${graphTripID}`, {headers: ClientRequestHeaders})
      const tripDetails = await tripDetailsResponse.json();

      return Promise.resolve(tripDetails);
  };

  const {data: query, isLoading: isQueryLoading} = useQuery(["accelGraph"], fetchGraphContent);
  const {data: tripQuery, isLoading: isTripQueryLoading} = useQuery(["tripDetails"], fetchTripDetails);

  useEffect(() => {
    if (query) setGraphContent(query);
    if (tripQuery)  setTripDetailsContent(tripQuery); 
  }, [query, tripQuery]);

    let xValues = [];
    let yValues = [];
    let timestamps = [];
    let date;
    try {
        if (!isQueryLoading && graphContent) {
            date = graphContent["variables"][0]['created_date'].split('T')[0];
            for (let i = 0; i < graphContent["variables"].length; i++) {
                xValues[i] = graphContent["variables"][i]["x"];
                yValues[i] = graphContent["variables"][i]["y"];
                timestamps[i] = graphContent["variables"][i]["created_date"].split('T')[1];
            }
        }
    } catch (err) {
        console.log(err);   
    }

    const tripDetailsKeysHTML:any = [];
    const tripDetailsValuesHTML:any = [];
    const startPositionKeysHTML:any = [];
    const startPositionValuesHTML:any = [];
    const endPositionKeysHTML:any = [];
    const endPositionValuesHTML:any = [];

    const handleSubAccordion = (keyID:string, keyHTML:any, valueHTML:any) => {
        const jsonConvert = JSON.parse(tripDetails[keyID]);
        Object.entries(jsonConvert).forEach(([key, value]) => {
            keyHTML.push(<Typography>{key}</Typography>);
            if (value == null) {
                valueHTML.push(<Typography>NULL</Typography>);
            } else {
                valueHTML.push(<Typography>{String(value)}</Typography>);
            }
        });
    }
    try {
        if (!isTripQueryLoading && tripDetails) {
            Object.entries(tripDetails).forEach(([key, value]) => {
                tripDetailsKeysHTML.push(<Typography>{key}</Typography>);
                if (value == null) {
                    tripDetailsValuesHTML.push(<Typography>NULL</Typography>);
                } else {
                    
                    tripDetailsValuesHTML.push(<Typography>{String(value)}</Typography>);
                }
                if (key == 'start_position_display') {
                    handleSubAccordion(key, startPositionKeysHTML, startPositionValuesHTML);
                } else if (key == 'end_position_display') {
                    handleSubAccordion(key, endPositionKeysHTML, endPositionValuesHTML);
                }
              });
        }
    } catch (err) {

    }
    

    const data = {
        labels: timestamps,
        datasets: [
            {
                label: 'Acceleration-x',
                data: xValues,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Acceleration-y',
                data: yValues,
                borderColor: 'rgb(100, 99, 158)',
                backgroundColor: 'rgba(100, 99, 158, 0.5)',
            }
        ],
    };
    
    
    return(
        <div>
            <Line options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top' as const,
                    },
                    title: {
                        display: true,
                        text: [`Trip: ${graphTaskID}`, date]
                    },
                },
            }} data={data} />
            {/* TODO: Make component to set in, instead of redundency */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Trip Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="trip_details_wrapper">
                        <div className="trip_key_column">
                            {tripDetailsKeysHTML.slice(0,6)}
                        </div>
                        <div className="trip_value_column">
                            {tripDetailsValuesHTML.slice(0,6)}
                        </div>
                    </div>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{tripDetailsKeysHTML[6]}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <div className="trip_details_wrapper">
                            <div className="trip_key_column">
                                {startPositionKeysHTML}
                            </div>
                            <div className="trip_value_column">
                                {startPositionValuesHTML}
                            </div>
                        </div>
                        </AccordionDetails>
                    </Accordion>
                    <div className="trip_details_wrapper">
                        <div className="trip_key_column">
                            {tripDetailsKeysHTML.slice(7,9)}
                        </div>
                        <div className="trip_value_column">
                            {tripDetailsValuesHTML.slice(7,9)}
                        </div>
                    </div>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{tripDetailsKeysHTML[9]}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="trip_details_wrapper">
                                <div className="trip_key_column">
                                    {endPositionKeysHTML}
                                </div>
                                <div className="trip_value_column">
                                    {endPositionValuesHTML}
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <div className="trip_details_wrapper">
                        <div className="trip_key_column">
                            {tripDetailsKeysHTML.slice(10,16)}
                        </div>
                        <div className="trip_value_column">
                            {tripDetailsValuesHTML.slice(10,16)}
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>

    );
};

export default GraphComponent;
