import { useLeafletContext } from "@react-leaflet/core";
import { antPath } from "leaflet-ant-path";
import { useEffect, useState } from "react";
import { useMapEvents } from "react-leaflet";

interface PathProps {
  positions: [number, number, number][];
}

export default ({ positions }: PathProps) => {
  const AntPath = ({ positions }: PathProps) => {
    const context = useLeafletContext();
    useEffect(() => {
      let antPolyline = antPath(positions);
      context.map.addLayer(antPolyline);
      return () => {
        context.map.removeLayer(antPolyline);
      };
    });
    return null;
  };

  return <AntPath positions={positions} />;
};
