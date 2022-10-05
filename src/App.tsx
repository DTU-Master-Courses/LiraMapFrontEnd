import "./App.css";
import Map from "./Components/Map/Map";
import { FC, useState } from "react";
import * as L from 'leaflet'; 
import NavBar from "./Components/NavBar/NavBar";
import GraphComponent from "./Components/Drawer/GraphComponent";
import RidesListComponent from "./Components/Drawer/RidesListComponent";

const App: FC = () => {
  const [graphComponentsList, setGraphComponentsList] = useState<any[]>([]);
  const [ridesIsRendered, setRidesIsRendered] = useState(false);
  
  const position = L.marker([55.7856,12.5214]);
  const [uniqueId, setUniqueId] = useState(0);

  const addGraphComponent = () => {
    setUniqueId(uniqueId + 1);
    setGraphComponentsList([...graphComponentsList, {component: `Draggable${uniqueId}`}]);
  }

  const removeGraphComponent = (index:number) => {
    const newGraphComponentsList = [...graphComponentsList];
    newGraphComponentsList.splice(index, 1);
    setGraphComponentsList(newGraphComponentsList);
  }

  return (
    <div className="App">
      <NavBar addGraphComponent={addGraphComponent} setRidesIsRendered={setRidesIsRendered}></NavBar>
      <Map position={position.getLatLng()} />
      {graphComponentsList.map((component, index) => (
        <GraphComponent key={component.component} removeGraphComponent={removeGraphComponent} index={index}></GraphComponent>
      ))}
      {ridesIsRendered && <RidesListComponent setRidesIsRendered={setRidesIsRendered}></RidesListComponent>}
    </div>
  );
}

export default App;
