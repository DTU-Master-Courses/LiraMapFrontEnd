import "./App.css";
import Map from "./Components/Map/Map";
import { FC, useState } from "react";
import * as L from 'leaflet'; 
import NavBar from "./Components/NavBar/NavBar";
import GraphComponent from "./Components/Drawer/GraphComponent";
import Window from "./Components/Base/Window";
import RidesMeasurementComponent from "./Components/Drawer/RidesMeasurementComponent";

const App: FC = () => {
  	const [graphComponentsList, setGraphComponentsList] = useState<any[]>([]);
  	const [polyLinePoints, setPolyLinePoints] = useState<[number, number][][]>([]);

  	const [ridesIsRendered, setRidesIsRendered] = useState(false);
  
  	const position = L.marker([55.7856,12.5214]);
  	const [uniqueId, setUniqueId] = useState(0);
  	const [uniqueZ, setUniqueZ] = useState(0);

  	const focusWindow = (windowId: number) => {
		if (windowInFocus !== windowId) {
			setWindowInFocus(windowId);
			setUniqueZ(uniqueZ + 100);
			return uniqueZ
		}
		return 0
  	}
  	const [windowInFocus, setWindowInFocus] = useState(0);

	const addGraphComponent = async(taskID: number, tripID: string) => {
		setUniqueId(uniqueId + 1);
		setUniqueZ(uniqueZ + 1);
		setGraphComponentsList([...graphComponentsList, {componentId: uniqueId, graphTaskID: taskID, graphTripID: tripID}]);
		let points;
		try {
            points = await fetch(`http://localhost:8000/trips/acceleration/${tripID}`).then((response) => response.json());
			console.log(points);
        } catch (err) {
            console.log(err);   
        }
		for (let i = 0; i < points.length; i++) {
			
		}
		setPolyLinePoints([...polyLinePoints, [[55.68173074538492, 12.558783990421695],
      [55.68099477243995, 12.560828719024013],
      [55.68023924596522, 12.562792582603771],
      [55.67923619691593, 12.564282808534271],
      [55.678656500996745, 12.564987489013037],
      [55.67907987526686, 12.565900107993734],
      [55.68029135170652, 12.567390333924234],
      [55.68105339024206, 12.568476234989872],
      [55.68219967665559, 12.569746970279446],
      [55.683775765668706, 12.572103606514087],
      [55.68461940014825, 12.57353542800247],
      [55.68529258278767, 12.57097302286676],
      [55.6857273404169, 12.569181827043735],
      [55.68495599291647, 12.568286229132223],
      [55.68533465631786, 12.56726624262189],
      [55.68613404479112, 12.565325780480283]]]); //TODO: Do the stuff here
	}

	const removeGraphComponent = (index: number) => {
		const newGraphComponentsList = [...graphComponentsList];
		const newPolyLinePoints = [...polyLinePoints];
		const findIndex = newGraphComponentsList.findIndex((value) => {
		return value.componentId === index
		})
		if (findIndex !== -1) {
			newGraphComponentsList.splice(findIndex, 1);
			setGraphComponentsList(newGraphComponentsList);

      
			newPolyLinePoints.splice(findIndex, 1);
			setPolyLinePoints(newPolyLinePoints);
		}
	}

	const removeTripComponent = () => {
		setRidesIsRendered(false);
	}

	return(
		<div className="App">
			<NavBar setRidesIsRendered={setRidesIsRendered}/>
			<Map position={position.getLatLng()} polyLinePoints={polyLinePoints} />
			{graphComponentsList.map((component, _) => (
				<Window
					key={component.componentId}
					id={component.componentId}
					x={350}
					y={300}
					width={'70%'}
					height={'60%'}
					windowName="Trip graph"
					closeWindow={removeGraphComponent}
					focusWindow={focusWindow}
				>
				<GraphComponent 
					graphTaskID={component.graphTaskID}
					graphTripID={component.graphTripID}
				/>
				</Window>
			))}
			{ridesIsRendered && 
				<Window
					id={uniqueId}
					x={17}
					y={100}
					width={'20%'}
					height={'80%'}
					windowName="Trips"
					closeWindow={removeTripComponent}
					focusWindow={focusWindow}
				>
				<RidesMeasurementComponent
					addGraphComponent={addGraphComponent}
				/>
				</Window>
			}
		</div>
	);
}

export default App;
