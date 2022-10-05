import { Typography } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { Rnd } from "react-rnd";
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

const x = 500;
const y = 500;

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => faker.faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => faker.faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

interface GraphComponentProps {
    index: number,
    removeGraphComponent(index: number): any;
}

const GraphComponent: FC<GraphComponentProps> = ({removeGraphComponent, index}) => {
    return(
        <Rnd
            className="draggable_component_container graph_component"
            bounds='body'
            dragHandleClassName={'draggable_handle'}
            default={{
            x: x,
            y: y,
            width: '60%',
            height: '40%'
            }}
        >
            <div className='draggable_handle'>
            <button className='close_component_btn' onClick={() => removeGraphComponent(index)}></button>
            </div>
            <div className='draggable_component_container_content'>
                <Line options={options} data={data} />;
            </div>
        </Rnd>
    );
};

export default GraphComponent;
