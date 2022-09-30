import React from "react";
import "./App.css";
import MapDemo from "./Components/Map/Map";
import { FC } from "react";
import * as L from 'leaflet';
import DraggableComponent from "./Components/Drawer/DraggableComponent";

const App: FC = () => {
  const position = L.marker([55.7856,12.5214]);
  return (
    <div className="App">
      <MapDemo position={position.getLatLng()} />
      <DraggableComponent></DraggableComponent>
    </div>
  );
}

export default App;
