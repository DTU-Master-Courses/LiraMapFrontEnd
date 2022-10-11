import { Rnd } from "react-rnd";
import '../Drawer/DrawerComponents.css';
import { FC, useState } from 'react';
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
    graphTitle: string,
    index: number,
}





const GraphComponent: FC<GraphComponentProps> = ({graphTitle, index}) => {
    const [z, setZ] = useState(0);
    const x = 350;
    const y = 300;


    return(
        <Line options={{
            responsive: true,
            plugins: {
                legend: {
                    position: 'top' as const,
                },
                title: {
                    display: true,
                    text: graphTitle,
                },
            },
        }} data={data} />
    );
};

export default GraphComponent;
