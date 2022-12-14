// Main Dev: johalexander
// Supporting Devs: PossibleNPC
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.gridlayer.googlemutant";
import { FC } from "react";
import {
  LayerGroup,
  LayersControl,
  MapContainer,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import "./Map.css";
import LiraHotline from "./LiraHotline";
import Path from "./Path";

interface MapDemoProps {
  position: LatLng;
  polyLinePoints: [number, number, number][][];
}

const MapDemo: FC<MapDemoProps> = ({
  position,
  polyLinePoints,
}: MapDemoProps) => {
  return (
    <>
      <div className="leaflet-container">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={true}
          zoomControl={false}
        >
          <ZoomControl position="bottomright" />
          <LayersControl position="bottomright">
            <LayersControl.BaseLayer name={"light gray".toUpperCase()}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">Carto</a>'
                url="http://cartodb-basemaps-c.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name={"satellite".toUpperCase()}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">ArcGIS</a>'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name={"osm".toUpperCase()} checked={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
            <LayersControl.Overlay
              name={"hotline".toUpperCase()}
              checked={true}
            >
              <LayerGroup>
                {polyLinePoints.map((component, i) => (
                  <>
                    <LiraHotline key={`hotline-${i}`} positions={component} />
                    <Path key={`path-${i}`} positions={component}></Path>
                  </>
                ))}
              </LayerGroup>
            </LayersControl.Overlay>
          </LayersControl>
        </MapContainer>
      </div>
    </>
  );
};

export default MapDemo;
