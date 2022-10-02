import { Typography } from "@material-ui/core";
import { Rnd } from "react-rnd";
import '../Drawer/DraggableComponent.css';

const x = 200;
const y = 200;

const DraggableComponent = () => (
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
            <button>Test</button>
        </div>
        
    </Rnd>
);

export default DraggableComponent;
