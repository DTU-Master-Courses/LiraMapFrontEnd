import { Typography } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { Rnd } from "react-rnd";
import '../Drawer/DrawerComponents.css';
import { Component, FC, useState } from 'react';
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
import zIndex from "@material-ui/core/styles/zIndex";
import { render } from "@testing-library/react";



ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

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
    ],
};

interface GraphComponentProps {
    graphTitle: string,
    index: number,
    removeGraphComponent(index: number): any;
    focusWindow(windowId: number):any;
    newZ: number,
}





const GraphComponent: FC<GraphComponentProps> = ({graphTitle,removeGraphComponent, index, focusWindow, newZ}) => {
    const [z, setZ] = useState(0);
    const [titleTripID, setTitleTripID] = useState('');

const x = 500;
const y = 500;


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
            style={{zIndex: 1000 + z}}
            onMouseDown={(e:MouseEvent) => {
                setZ(newZ + 1);
                focusWindow(index + 400000); //400.000 is to differentiate between other types of windows
            }}
        >
            <div className='draggable_handle'>
            <button className='close_component_btn' onClick={() => removeGraphComponent(index)}></button>
            </div>
            <div className='draggable_component_container_content'>
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
                }} data={data} />;
            </div>
        </Rnd>
    );
};

export default GraphComponent;
