import '../Drawer/DrawerComponents.css';
import { FC } from 'react';
import RideComponent from "./RideComponent";

const NUMBER_OF_RIDES = 100;

interface RidesListComponentProps {
    addGraphComponent(title:string): any,
    setRidesIsRendered: any;
}

const addRideComponentList = (addGraphComponent:any) => {
    const rideComponents = []
    for(let i = 1; i <= NUMBER_OF_RIDES; i++) {
        rideComponents.push(
            <RideComponent 
                key={'Trip ' + i}
                addGraphComponent={addGraphComponent} 
                tripID={'Trip ' + i}
                startCity={'København'}
                endCity={'Lyngby'}
            />
        )
    }
    return rideComponents;
}

const RidesListComponent: FC<RidesListComponentProps> = ({setRidesIsRendered, addGraphComponent}) => {
    return(
        <div className='wrapper'>
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
        </div>
    );
};

export default RidesListComponent;
