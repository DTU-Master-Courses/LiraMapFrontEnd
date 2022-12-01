// Main Dev: Gustav
// Supporting Devs: johalexander, CookieNess, PossibleNPC
import "./App.css";
import Map from "./Components/Map/Map";
import { FC, useState } from "react";
import * as L from "leaflet";
import NavBar from "./Components/NavBar/NavBar";
import GraphComponent from "./Components/Drawer/GraphComponent";
import Window from "./Components/Base/Window";
import RidesMeasurementComponent from "./Components/Drawer/RidesMeasurementComponent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ClientRequestHeaders from "./Components/Utils/client-request-headers";
import HOSTNAME from "./Components/Utils/hostname";

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
  const [polyLinePoints, setPolyLinePoints] = useState<
    [number, number, number][][]
  >([]);

  const [ridesIsRendered, setRidesIsRendered] = useState(false);

  const position = L.marker([55.677240026834134, 12.567320700469025]);
  const [uniqueId, setUniqueId] = useState(0);
  const [uniqueZ, setUniqueZ] = useState(0);

  const [windowInFocus, setWindowInFocus] = useState(0);

  const focusWindow = (windowId: number) => {
    if (windowInFocus !== windowId) {
      setWindowInFocus(windowId);
      setUniqueZ(uniqueZ + 100);
      return uniqueZ;
    }
    return 0;
  };

  const addGraphComponent = async (taskID: number, tripID: string) => {
    setUniqueId(uniqueId + 1);
    setUniqueZ(uniqueZ + 1);
    setGraphComponentsList([
      ...graphComponentsList,
      { componentId: uniqueId, graphTaskID: taskID, graphTripID: tripID },
    ]);
    let points;
    // TODO: Need to migrate to React Query
    try {
      points = await fetch(
        `http://${HOSTNAME}:8000/trips/acceleration/${tripID}`,
        {
          headers: ClientRequestHeaders,
        }
      ).then((response) => response.json());
    } catch (err) {
      console.log(err);
    }

    let newPolyPoints: [number, number, number][] = [];
    for (let i = 0; i < points["acceleration"].length; i++) {
      newPolyPoints.push([
        points["acceleration"][i]["lat"],
        points["acceleration"][i]["lon"],
        Math.sqrt(
          points["acceleration"][i]["ax"] ** 2 +
            points["acceleration"][i]["ay"] ** 2
        ),
      ]);
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

  const hideGraphComponent = (index: number) => {
    const newGraphComponentsList = [...graphComponentsList];
    const findIndex = newGraphComponentsList.findIndex((value) => {
      return value.componentId === index;
    });
    newGraphComponentsList[findIndex].hidden = true;
    setGraphComponentsList(newGraphComponentsList);
  };

  const showGraphComponent = (index: number) => {
    const newGraphComponentsList = [...graphComponentsList];
    const findIndex = newGraphComponentsList.findIndex((value) => {
      return value.componentId === index;
    });
    newGraphComponentsList[findIndex].hidden = false;
    setGraphComponentsList(newGraphComponentsList);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <NavBar
          setRidesIsRendered={setRidesIsRendered}
          openGraphs={graphComponentsList}
          showGraphWindow={showGraphComponent}
        />
        <Map position={position.getLatLng()} polyLinePoints={polyLinePoints} />
        {graphComponentsList.map((component, _) => (
          <Window
            key={component.componentId}
            id={component.componentId}
            x={350}
            y={300}
            width={"70%"}
            height={"60%"}
            windowName={`Trip: ${component.graphTaskID}`}
            hideWindow={hideGraphComponent}
            closeWindow={removeGraphComponent}
            focusWindow={focusWindow}
            hidable={true}
            hidden={component.hidden}
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
