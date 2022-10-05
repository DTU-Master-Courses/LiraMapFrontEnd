import { Typography } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { Rnd } from "react-rnd";
import '../Drawer/DrawerComponents.css';
import { FC } from 'react';

const x = 500;
const y = 500;

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
                
            </div>
        </Rnd>
    );
};

export default GraphComponent;
