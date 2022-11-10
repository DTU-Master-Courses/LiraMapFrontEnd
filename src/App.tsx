import "./App.css";
import Map from "./Components/Map/Map";
import { FC, useState } from "react";
import * as L from "leaflet";
import NavBar from "./Components/NavBar/NavBar";
import GraphComponent from "./Components/Drawer/GraphComponent";
import Window from "./Components/Base/Window";
import RidesMeasurementComponent from "./Components/Drawer/RidesMeasurementComponent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: 0,
    },
  },
});

const App: FC = () => {
  const [graphComponentsList, setGraphComponentsList] = useState<any[]>([]);
  const [polyLinePoints, setPolyLinePoints] = useState<[number, number][][]>(
    []
  );
  const [hiddenGraphs, setHiddenGraphs] = useState<[String, number][]>([]);

  const [ridesIsRendered, setRidesIsRendered] = useState(false);

  const position = L.marker([55.677240026834134, 12.567320700469025]);
  const [uniqueId, setUniqueId] = useState(0);
  const [uniqueZ, setUniqueZ] = useState(0);

	const [windowInFocus, setWindowInFocus] = useState(0);

  const focusWindow = (windowId : number) => {
		if (windowInFocus !== windowId) {
      console.log(windowId);
			setWindowInFocus(windowId);
			setUniqueZ(uniqueZ + 100);
			return uniqueZ
		}
		return 0
  }
  	

	const addGraphComponent = async(taskID: number, tripID: string) => {
		setUniqueId(uniqueId + 1);
		setUniqueZ(uniqueZ + 1);
		setGraphComponentsList([...graphComponentsList, {componentId: uniqueId, graphTaskID: taskID, graphTripID: tripID}]);
		let points;
		try {
            points = await fetch(`http://localhost:8000/trips/segments/${tripID}`).then((response) => response.json());
        } catch (err) {
            console.log(err);   
        }	

    let newPolyPoints: [number, number][] = [];
    for (let i = 0; i < points.length; i++) {
      newPolyPoints.push([points[i]["lat"], points[i]["lon"]]);
    }
    setPolyLinePoints([...polyLinePoints, newPolyPoints]);
  };

  const removeGraphComponent = (index: number) => {
    const newGraphComponentsList = [...graphComponentsList];
    const newPolyLinePoints = [...polyLinePoints];
    const findIndex = newGraphComponentsList.findIndex((value) => {
      return value.componentId === index;
    });
    if (findIndex !== -1) {
      newGraphComponentsList.splice(findIndex, 1);
      setGraphComponentsList(newGraphComponentsList);

      newPolyLinePoints.splice(findIndex, 1);
      setPolyLinePoints(newPolyLinePoints);
    }
  };

  const removeTripComponent = () => {
    setRidesIsRendered(false);
  };

  const hideGraphComponent = (index: number) => {};

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <NavBar setRidesIsRendered={setRidesIsRendered} />
        <Map position={position.getLatLng()} polyLinePoints={polyLinePoints} />
        {graphComponentsList.map((component, _) => (
          <Window
            key={component.componentId}
            id={component.componentId}
            x={350}
            y={300}
            width={"70%"}
            height={"60%"}
            windowName="Trip graph"
            closeWindow={removeGraphComponent}
            focusWindow={focusWindow}
            hidable={true}
          >
            <GraphComponent
              graphTaskID={component.graphTaskID}
              graphTripID={component.graphTripID}
            />
          </Window>
        ))}
        {ridesIsRendered && (
          <Window
            id={uniqueId}
            x={17}
            y={100}
            width={"20%"}
            height={"80%"}
            windowName="Trips"
            closeWindow={removeTripComponent}
            focusWindow={focusWindow}
          >
            <RidesMeasurementComponent addGraphComponent={addGraphComponent} />
          </Window>
        )}
      </div>
    </QueryClientProvider>
  );
};

export default App;
