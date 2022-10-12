import '../Drawer/DrawerComponents.css';
import { FC, useState, useEffect } from 'react';
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
import * as faker from '@faker-js/faker';

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

    useEffect(() => {
        fetchGraphContent();
    }, []);

    const fetchGraphContent = async() => {
        try {
            await fetch(`http://localhost:8000/trips/acceleration/${graphTripID}`).then((response) => response.json()).then((json_response) => setGraphContent(json_response));
        } catch (err) {
            console.log(err);   
        }
    }
    let xValues = [];
    let yValues = [];
    try {
        if (graphContent !== undefined && graphContent !== null) {
            for (let i = 0; i < graphContent["acceleration"].length; i++) {
                xValues[i] = graphContent["acceleration"][i]["x"];
            }
            for (let i = 0; i < graphContent["acceleration"].length; i++) {
                yValues[i] = graphContent["acceleration"][i]["y"];
            }
        }
    } catch (err) {
        console.log(err);   
    }

    const data = {
        labels: xValues,
        datasets: [
            {
                label: 'Dataset 1',
                data: yValues,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    
    
    return(
        <Line options={{
            responsive: true,
            plugins: {
                legend: {
                    position: 'top' as const,
                },
                title: {
                    display: true,
                    text: `Trip: ${graphTaskID}`,
                },
            },
        }} data={data} />
    );
};

export default GraphComponent;
