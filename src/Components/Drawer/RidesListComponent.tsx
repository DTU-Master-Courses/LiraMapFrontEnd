import { Typography } from "@material-ui/core";
import { Rnd } from "react-rnd";
import '../Drawer/DrawerComponents.css';
import { FC } from 'react';

const x = 10;
const y = 100;

interface RidesListComponentProps {
    index: number,
    removeRidesComponent(index: number): any;
}

const RidesListComponent: FC<RidesListComponentProps> = ({removeRidesComponent, index}) => {
    return(
        <Rnd
            className="draggable_component_container rides_list_component"
            bounds='body'
            dragHandleClassName={'draggable_handle'}
            default={{
            x: x,
            y: y,
            width: '15%',
            height: '80%'
            }}
        >
            <div className='draggable_handle'>
                <button className='close_component_btn' onClick={() => removeRidesComponent(index)}></button>
            </div>
            <div className='draggable_component_container_content'>
                
            </div>
        </Rnd>
    );
};

export default RidesListComponent;
