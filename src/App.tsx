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
  const [newZ, setNewZ] = useState(0);
  const [windowInFocus, setWindowInFocus] = useState(0);
  //let windowInFocus:number;

  const [graphTitleList, setGraphTitleList] = useState<any[]>([]);

  const addGraphComponent = (title:string) => {
    setUniqueId(uniqueId + 1);
    setGraphComponentsList([...graphComponentsList, {component: `Draggable${uniqueId}`}]);
    setGraphTitleList([...graphTitleList, {graphTitle: title}]);
  }

  const focusWindow = (windowId:number) => {
    if(windowInFocus != windowId){
      setWindowInFocus(windowId);
      setNewZ(newZ + 1);
    }
  }

  const removeGraphComponent = (index:number) => {
    const newGraphComponentsList = [...graphComponentsList];
    newGraphComponentsList.splice(index, 1);
    setGraphComponentsList(newGraphComponentsList);

    const newTitleList = [...graphTitleList];
    newTitleList.splice(index, 1);
    setGraphTitleList(newTitleList);
  }

  return (
    <div className="App">
      <NavBar setRidesIsRendered={setRidesIsRendered}/>
      <Map position={position.getLatLng()} />
      {graphComponentsList.map((component, index) => (
        <GraphComponent 
          key={component.component} 
          removeGraphComponent={removeGraphComponent} 
          index={index} 
          graphTitle={graphTitleList[index].graphTitle}
          focusWindow={focusWindow}
          newZ={newZ}
        />
      ))}
      {ridesIsRendered && 
        <RidesListComponent 
          addGraphComponent={addGraphComponent} 
          setRidesIsRendered={setRidesIsRendered}
          focusWindow={focusWindow}
          newZ={newZ}
        />
      }
    </div>
  );
}

export default App;
