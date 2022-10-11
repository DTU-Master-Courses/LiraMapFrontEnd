import "./App.css";
import Map from "./Components/Map/Map";
import { FC, useState } from "react";
import * as L from 'leaflet'; 
import NavBar from "./Components/NavBar/NavBar";
import GraphComponent from "./Components/Drawer/GraphComponent";
import RidesListComponent from "./Components/Drawer/RidesListComponent";
import Window from "./Components/Drawer/Window";

const App: FC = () => {
  const [graphWindowList, setGraphWindowList] = useState<any[]>([]);
  const [ridesIsRendered, setRidesIsRendered] = useState(false);
  
  const position = L.marker([55.7856,12.5214]);
  const [uniqueId, setUniqueId] = useState(0);
  const [newZ, setNewZ] = useState(0);
  const [windowInFocus, setWindowInFocus] = useState(0);
  //let windowInFocus:number;

  const [graphTitleList, setGraphTitleList] = useState<any[]>([]);

  const addGraphComponent = (title:string) => {
    setUniqueId(uniqueId + 1);
    setGraphWindowList([...graphWindowList, {component: `Draggable${uniqueId}`}]);
    setGraphTitleList([...graphTitleList, {graphTitle: title}]);
  }

  const focusWindow = (windowId:number) => {
    if(windowInFocus != windowId){
      setWindowInFocus(windowId);
      setNewZ(newZ + 1);
    }
  }

  const closeGraphWindow = (index:number) => {
    const newGraphWindowList = [...graphWindowList];
    newGraphWindowList.splice(index, 1);
    setGraphWindowList(newGraphWindowList);

    const newTitleList = [...graphTitleList];
    newTitleList.splice(index, 1);
    setGraphTitleList(newTitleList);
  }

  const closeRidesListWindow = () => {
    setRidesIsRendered(false);
  }

  return (
    <div className="App">
      <NavBar setRidesIsRendered={setRidesIsRendered}/>
      <Map position={position.getLatLng()} />
      {graphWindowList.map((component, index) => (
        <Window
          closeWindow={closeGraphWindow}
          index={index + 1000000}
          focusWindow={focusWindow}
          newZ={newZ}>
          
          <GraphComponent 
          key={component.component} 
          index={index} 
          graphTitle={graphTitleList[index].graphTitle}/>
        </Window>
      ))}
      {ridesIsRendered && 
        <Window
          closeWindow={closeRidesListWindow}
          index={800}
          focusWindow={focusWindow}
          newZ={newZ}>
            <RidesListComponent 
            addGraphComponent={addGraphComponent} 
            setRidesIsRendered={setRidesIsRendered}
            focusWindow={focusWindow}
            newZ={newZ}
            />
        </Window>
      }
    </div>
  );
}

export default App;
