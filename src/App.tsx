import "./App.css";
import Map from "./Components/Map/Map";
import { FC, useState } from "react";
import * as L from 'leaflet'; 
import NavBar from "./Components/NavBar/NavBar";
import GraphComponent from "./Components/Drawer/GraphComponent";
import RidesListComponent from "./Components/Drawer/RidesListComponent";
import DraggableWindow from "./Components/Base/DraggableWindow";

const App: FC = () => {
  const [graphComponentsList, setGraphComponentsList] = useState<any[]>([]);
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

  const addGraphComponent = (title: string) => {
    setUniqueId(uniqueId + 1);
    setUniqueZ(uniqueZ + 1);
    setGraphComponentsList([...graphComponentsList, {componentId: uniqueId, graphTitle: title}]);
  }

  const removeGraphComponent = (index: number) => {
    const newGraphComponentsList = [...graphComponentsList];
    newGraphComponentsList.splice(index, 1);
    setGraphComponentsList(newGraphComponentsList);
  }

  return (
    <div className="App">
      <NavBar setRidesIsRendered={setRidesIsRendered}/>
      <Map position={position.getLatLng()} />
      {graphComponentsList.map((component, index) => (
        <DraggableWindow
          key={component.componentId}
          id={component.componentId}
          componentName = {"graph_component"}
          x={350}
          y={300}
          width={'70%'}
          height={'60%'}
          focusWindow={focusWindow}
        >
          <GraphComponent 
            removeGraphComponent={removeGraphComponent} 
            index={index} 
            graphTitle={component.graphTitle}
          />
        </DraggableWindow>
      ))}
      {ridesIsRendered && 
        <DraggableWindow
          id={uniqueId}
          componentName={"rides_list_component"}
          x={10}
          y={120}
          width={'20%'}
          height={'80%'}
          focusWindow={focusWindow}
        >
          <RidesListComponent
            addGraphComponent={addGraphComponent} 
            setRidesIsRendered={setRidesIsRendered}
          />
        </DraggableWindow>
      }
    </div>
  );
}

export default App;
