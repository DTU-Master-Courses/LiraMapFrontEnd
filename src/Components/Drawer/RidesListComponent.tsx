
import { Rnd } from "react-rnd";
import '../Drawer/DrawerComponents.css';
import { FC, useEffect, useState, useRef } from 'react';
import RideComponent from "./RideComponent";
import axios from 'axios';
import { json } from "stream/consumers";

const x = 10;
const y = 120;
const NUMBER_OF_RIDES = 100;

interface RidesListComponentProps {
    addGraphComponent(title:string): any,
    setRidesIsRendered: any
    focusWindow(windowId: number):any;
    newZ: number,
}

const addRideComponentList = (addGraphComponent:any, tripID:any) => {
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

const fetchRides = async() => {
    try {
        const res = await axios.get(`http://localhost:8000/trips`);
        return res.data;
    } catch (err) {
        console.log(err);   
    }
}

const RidesListComponent: FC<RidesListComponentProps> = ({setRidesIsRendered, addGraphComponent, focusWindow, newZ}) => {
    const [z, setZ] = useState(0);
    let rides = useRef({});
    useEffect(() => {
        rides.current = fetchRides();
    }, []);
    
    
    return(
            <div className='draggable_component_container_content'>
                {addRideComponentList(addGraphComponent, rides)}
            </div>
    );
};

export default RidesListComponent;
