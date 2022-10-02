import { Typography } from "@material-ui/core";
import { Rnd } from "react-rnd";
import '../Drawer/DraggableComponent.css';
import { FC } from 'react';

const x = 200;
const y = 200;

interface DraggableComponentProps {
    removeComponent(index: any): any;
}

const DraggableComponent: FC<DraggableComponentProps> = ({removeComponent}) => {
    <Rnd
        className="draggable_component_container"
        bounds='body'
        dragHandleClassName={'draggable_handle'}
        default={{
        x: x,
        y: y,
        width: '60%',
        height: '40%'
        }}
    >
        <div className='draggable_handle'></div>
        <div className='draggable_component_container_content'>
            <button onClick={removeComponent(index)}>Test</button>
        </div>
        
    </Rnd>

    return DraggableComponent;
};

export default DraggableComponent;
