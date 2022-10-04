import { Typography } from "@material-ui/core";
import { Rnd } from "react-rnd";
import '../Drawer/DrawerComponents.css';
import { FC } from 'react';

const x = 200;
const y = 200;

interface DraggableComponentProps {
    index: number,
    removeComponent(index: number): any;
}

const RidesListComponent: FC<DraggableComponentProps> = ({removeComponent, index}) => {
    return(
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
                <button onClick={() => removeComponent(index)}>{index}</button>
            </div>
        </Rnd>
    );
};

export default RidesListComponent;
