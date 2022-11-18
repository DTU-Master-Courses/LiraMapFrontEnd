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
import { Hotline } from "leaflet-hotline-react";

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
                // http://cartodb-basemaps-c.global.ssl.fastly.net/light_all/12/1205/1540.png
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
          </LayersControl>
          {polyLinePoints.map((component, i) => (
            <Hotline
              positions={component}
              weight={3}
              min={0}
              max={1000}
              palette={{
                0.0: 'red',
                0.5: 'yellow',
                1.0: 'green',
              }}
            />
          ))}
        </MapContainer>
      </div>
    </>
  );
};

export default MapDemo;
