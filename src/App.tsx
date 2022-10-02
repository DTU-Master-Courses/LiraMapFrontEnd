import React from "react";
import "./App.css";
import MapDemo from "./Components/Map/Map";
import { FC, useState } from "react";
import * as L from 'leaflet'; 
import NavBar from "./Components/NavBar/NavBar";
import DraggableComponent from "./Components/Drawer/DraggableComponent";

const App: FC = () => {
  const [componentsList, setComponentsList] = useState([{component: ''}]);
  const position = L.marker([55.7856,12.5214]);
  const [uniqueId, setUniqueId] = useState(0);

  const addComponent = () => {
    setUniqueId(uniqueId + 1)
    setComponentsList([...componentsList, {component: `Draggable${uniqueId}`}]);
  }

  const removeComponent = (index:number) => {
    const newComponentsList = [...componentsList];
    newComponentsList.splice(index, 1);
    setComponentsList(newComponentsList);
  }

  return (
    <div className="App">
      <NavBar addComponent={addComponent}></NavBar>
      <MapDemo position={position.getLatLng()} />
      {componentsList.map((component, index) => (
        <DraggableComponent key={component.component} removeComponent={removeComponent} index={index}></DraggableComponent>
      ))}
    </div>
  );
}

export default App;
