import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.gridlayer.googlemutant";
import { FC, useState, useEffect } from "react";
import {
	Polyline,
  	LayersControl,
  	MapContainer,
  	TileLayer,
  	ZoomControl,
} from "react-leaflet";
import "./Map.css";

interface MapDemoProps {
  	position: LatLng;
  	plottedTrip: { tripId: string, measurementType: string };
}

const MapDemo: FC<MapDemoProps> = ({ position, plottedTrip }: MapDemoProps) => {

	const [data, setData] = useState([]);

	useEffect(() => {
		if (plottedTrip.tripId !== "" && plottedTrip.measurementType !== "") {
			fetchRides(plottedTrip.tripId, plottedTrip.measurementType)
		}
    }, [plottedTrip]);

	const fetchRides = async (tripId: string, measurementType: string) => {
        try {
            await fetch(`http://localhost:8000/measurement/ride?trip_id=${tripId}&tag=${measurementType}`).then((response) => response.json()).then((json_response) => {
                setData(json_response['path'].flat().map((element: any) => {
					return [element['lat'], element['lng']]
				}));
            });
        } catch (err) {
            console.log(err);
        }
    }

  	return (
    	<>
      		<div className="leaflet-container">
        		<MapContainer
					center={position}
					zoom={13}
					scrollWheelZoom={true}
					zoomControl={false}
        		>
					<ZoomControl position="bottomright" />
					<LayersControl position="bottomright">
						<LayersControl.BaseLayer name={"satellite".toUpperCase()}>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
						/>
						</LayersControl.BaseLayer>
						<LayersControl.BaseLayer name={"osm".toUpperCase()} checked={true}>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						</LayersControl.BaseLayer>
					</LayersControl>
					<Polyline positions={data} color={'rgb(255, 99, 132)'} />
				</MapContainer>
      		</div>
    	</>
  	);
};

export default MapDemo;
