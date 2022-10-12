import '../Drawer/DrawerComponents.css';
import { FC } from 'react';
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

const labels = [1,2,3,4,5,6,7,8,9,10];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => faker.faker.datatype.number({ min: 0, max: 1 })),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
};

interface GraphComponentProps {
    graphTripID: number
}

const GraphComponent: FC<GraphComponentProps> = ({ graphTripID }) => {
    return(
        <Line options={{
            responsive: true,
            plugins: {
                legend: {
                    position: 'top' as const,
                },
                title: {
                    display: true,
                    text: `Trip: ${graphTripID}`,
                },
            },
        }} data={data} />
    );
};

export default GraphComponent;
