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
    removeGraphComponent(index: number): any;
    focusWindow(windowId: number):any;
    newZ: number,
}





const GraphComponent: FC<GraphComponentProps> = ({graphTitle,removeGraphComponent, index, focusWindow, newZ}) => {
    const [z, setZ] = useState(0);
    const x = 350;
    const y = 300;


    return(
        <Rnd
            className="draggable_component_container graph_component"
            bounds='body'
            dragHandleClassName={'draggable_handle'}
            default={{
            x: x,
            y: y,
            width: '70%',
            height: '60%'
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
