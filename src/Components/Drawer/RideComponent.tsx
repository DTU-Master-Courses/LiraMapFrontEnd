import { Typography } from "@material-ui/core";
import { FC, useState } from 'react';
import '../Drawer/RideComponent.css';

interface RideComponentProps {
    addGraphComponent(): any,
    tripID: string,
    startCity: string,
    endCity: string
}

const RideComponent: FC<RideComponentProps> = ({addGraphComponent, tripID, startCity, endCity}) => {
    const [rideIsSelected, setRideIsSelected] = useState(false);
    const switchSelectedState = () => {
        setRideIsSelected(current => !current);
    }
    return (
        <div className='ride_container'>
            <div className='ride_info'>
                <Typography variant="h6">{tripID}</Typography>
                <Typography variant="subtitle2">{startCity} &#8594; {endCity}</Typography>
            </div>
            <button onClick={() => {
                switchSelectedState();
                addGraphComponent();
            }} className={`select_ride_btn ${rideIsSelected ? 'ride_selected' : 'ride_unselected'}`}></button>
        </div>

    );
}

export default RideComponent;