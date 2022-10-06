
import { Rnd } from "react-rnd";
import '../Drawer/DrawerComponents.css';
import { FC, useState } from 'react';
import RideComponent from "./RideComponent";
import { minHeight } from "@mui/system";

const x = 10;
const y = 120;
const NUMBER_OF_RIDES = 100;



interface RidesListComponentProps {
    addGraphComponent(title:string): any,
    setRidesIsRendered: any
    focusWindow(windowId: number):any;
    newZ: number,
}

const addRideComponentList = (addGraphComponent:any) => {
    const rideComponents = []
    for(let i = 1; i <= NUMBER_OF_RIDES; i++) {
        rideComponents.push(
            <RideComponent 
                addGraphComponent={addGraphComponent} 
                tripID={'Trip ' + i} 
                startCity={'København'} 
                endCity={'Lyngby'}
            />
        )
    }
    return rideComponents;
}

const RidesListComponent: FC<RidesListComponentProps> = ({setRidesIsRendered, addGraphComponent, focusWindow, newZ}) => {
    const [z, setZ] = useState(0);
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
            style={{zIndex: 1000 + z}}
            onMouseDown={(e:MouseEvent) => {
                setZ(newZ + 1);
                focusWindow(-900); //Unique number for windows that only allows for one instance
            }}
        >
            <div className='draggable_handle'>
                <button className='close_component_btn' onClick={() => setRidesIsRendered(false)}></button>
            </div>
            <div className='draggable_component_container_content'>
                {addRideComponentList(addGraphComponent)}
            </div>
            <div>
                <button>TRIP DETAILS</button>
                <button>CLEAR</button>
            </div>
        </Rnd>
    );
};

export default RidesListComponent;
