import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.gridlayer.googlemutant";
import React, { FC, useState } from "react";
import {
  Circle,
  LayersControl,
  MapContainer,
  Polyline,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import NavBar from "../NavBar/NavBar";
import "./Map.css";

interface MapDemoProps {
  position: LatLng;
  selectedRide: Boolean;
}

// TODO: Refactor this down, or scrap it. I'm having to work fast, so corners are getting cut for proof of concept
const Map: FC<MapDemoProps> = ({ position, selectedRide }: MapDemoProps) => {
  const polyLines: [number, number][] = [
    [55.68173074538492, 12.558783990421695],
    [55.68099477243995, 12.560828719024013],
    [55.68023924596522, 12.562792582603771],
    [55.67923619691593, 12.564282808534271],
    [55.678656500996745, 12.564987489013037],
    [55.67907987526686, 12.565900107993734],
    [55.68029135170652, 12.567390333924234],
    [55.68105339024206, 12.568476234989872],
    [55.68219967665559, 12.569746970279446],
    [55.683775765668706, 12.572103606514087],
    [55.68461940014825, 12.57353542800247],
    [55.68529258278767, 12.57097302286676],
    [55.6857273404169, 12.569181827043735],
    [55.68495599291647, 12.568286229132223],
    [55.68533465631786, 12.56726624262189],
    [55.68613404479112, 12.565325780480283]
  ];

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
            <LayersControl.Overlay name={"road conditions".toUpperCase()}>
              <Circle
                center={position}
                pathOptions={{ fillColor: "blue" }}
                radius={200}
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay name={"lorem ipsum".toUpperCase()}>
              <Circle
                center={position}
                pathOptions={{ fillColor: "blue" }}
                radius={200}
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay name={"ipsum lorem".toUpperCase()}>
              <Circle
                center={position}
                pathOptions={{ fillColor: "blue" }}
                radius={200}
              />
            </LayersControl.Overlay>
          </LayersControl>
          {selectedRide && <Polyline positions={polyLines} color={'rgb(255, 99, 132)'} />}
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
