import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.gridlayer.googlemutant";
import { FC } from "react";
import {
  Circle,
  LayersControl,
  MapContainer,
  Polyline,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import "./Map.css";

interface MapDemoProps {
  position: LatLng;
  polyLinePoints: [number, number][][];
}

const MapDemo: FC<MapDemoProps> = ({ position, polyLinePoints }: MapDemoProps) => {
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
            <LayersControl.BaseLayer name={"satellite".toUpperCase()}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name={"osm".toUpperCase()} checked={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
          </LayersControl>
          {polyLinePoints.map((component, i) => (
            <Polyline key={`Poly ${i}`} positions={component} color={'rgb(255, 99, 132)'} />
          ))}
        </MapContainer>
      </div>
    </>
  );
};

export default MapDemo;
