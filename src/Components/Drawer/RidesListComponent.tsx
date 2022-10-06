
import { Rnd } from "react-rnd";
import '../Drawer/DrawerComponents.css';
import { FC } from 'react';
import RideComponent from "./RideComponent";

const x = 10;
const y = 120;
const NUMBER_OF_RIDES = 100;

interface RidesListComponentProps {
    addGraphComponent(title:string): any,
    setRidesIsRendered: any
}

const RidesListComponent: FC<RidesListComponentProps> = ({setRidesIsRendered, addGraphComponent}) => {
    return(
        <Rnd
            className="draggable_component_container rides_list_component"
            bounds='body'
            dragHandleClassName={'draggable_handle'}
            default={{
            x: x,
            y: y,
            width: '20%',
            height: '80%'
            }}
        >
            <div className='draggable_handle'>
                <button className='close_component_btn' onClick={() => setRidesIsRendered(false)}></button>
            </div>
            <div className='draggable_component_container_content'>
                <RideComponent addGraphComponent={addGraphComponent} tripID={'Trip ' + 123} startCity={'Lyngby'} endCity={'København'}/>
                <RideComponent addGraphComponent={addGraphComponent} tripID={'Trip ' + 256} startCity={'Lyngby'} endCity={'København'}/>
            </div>
            <div>
                <button>TRIP DETAILS</button>
                <button>CLEAR</button>
            </div>
        </Rnd>
    );
};

export default RidesListComponent;
