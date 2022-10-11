
import { Rnd } from "react-rnd";
import '../Drawer/DrawerComponents.css';
import { FC, useState } from 'react';
import RideComponent from "./RideComponent";

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
        
            <div className='draggable_component_container_content'>
                {addRideComponentList(addGraphComponent)}
            </div>
    );
};

export default RidesListComponent;
