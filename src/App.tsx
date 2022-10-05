import "./App.css";
import MapDemo from "./Components/Map/Map";
import { FC, useState } from "react";
import * as L from 'leaflet'; 
import NavBar from "./Components/NavBar/NavBar";
import GraphComponent from "./Components/Drawer/GraphComponent";
import RidesListComponent from "./Components/Drawer/RidesListComponent";

const App: FC = () => {
  const [graphComponentsList, setGraphComponentsList] = useState([{component: ''}]);
  const [ridesComponentList, setRidesComponentsList] = useState([{component: ''}]);
  const position = L.marker([55.7856,12.5214]);
  const [uniqueId, setUniqueId] = useState(0);

  const addGraphComponent = () => {
    setUniqueId(uniqueId + 1)
    setGraphComponentsList([...graphComponentsList, {component: `Draggable${uniqueId}`}]);
  }

  const removeGraphComponent = (index:number) => {
    const newGraphComponentsList = [...graphComponentsList];
    newGraphComponentsList.splice(index, 1);
    setGraphComponentsList(newGraphComponentsList);
  }

  const addRidesComponent = () => {
    if (ridesComponentList.length == 0) {
      setRidesComponentsList([...ridesComponentList, {component: ''}]);
    }
  }

  const removeRidesComponent = (index:number) => {
    const newRidesComponentsList = [...ridesComponentList];
    newRidesComponentsList.splice(index, 1);
    setRidesComponentsList(newRidesComponentsList);
  }

  return (
    <div className="App">
      <NavBar addGraphComponent={addGraphComponent} addRidesComponent={addRidesComponent}></NavBar>
      <MapDemo position={position.getLatLng()} />
      {graphComponentsList.map((component, index) => (
        <GraphComponent key={component.component} removeGraphComponent={removeGraphComponent} index={index}></GraphComponent>
      ))}
      {ridesComponentList.map((component, index) => (
        <RidesListComponent key={component.component} removeRidesComponent={removeRidesComponent} index={index}></RidesListComponent>
      ))}
    </div>
  );
}

export default App;
