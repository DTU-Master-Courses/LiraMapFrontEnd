import '../Drawer/DrawerComponents.css';
import { FC, useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography }  from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useQuery } from "@tanstack/react-query";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';

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

    useEffect(() => {
        fetchGraphContent();
        fetchTripDetails();
    }, []);

    const fetchGraphContent = async() => {
        try {
            await fetch(`http://localhost:8000/trips/acceleration/${graphTripID}`).then((response) => response.json()).then((json_response) => setGraphContent(json_response));
        } catch (err) {
            console.log(err);    
        }
    }
    const fetchTripDetails = async() => {
        try {
            await fetch(`http://localhost:8000/trips/id/${graphTripID}`).then((response) => response.json()).then((json_response) => setTripDetailsContent(json_response));
        } catch (err) {
            console.log(err);    
        }
    }

    let xValues = [];
    let yValues = [];
    let timestamps = [];
    let date;
    try {
        if (graphContent !== undefined && graphContent !== null) {
            date = graphContent["acceleration"][0]['created_date'].split('T')[0];
            for (let i = 0; i < graphContent["acceleration"].length; i++) {
                xValues[i] = graphContent["acceleration"][i]["x"];
                yValues[i] = graphContent["acceleration"][i]["y"];
                timestamps[i] = graphContent["acceleration"][i]["created_date"].split('T')[1];
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
        if (tripDetails !== undefined && tripDetails !== null) {
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
