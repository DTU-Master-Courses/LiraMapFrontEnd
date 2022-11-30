import {useLeafletContext} from "@react-leaflet/core";
import {antPath} from "leaflet-ant-path";
import {useEffect} from "react";

interface PathProps {
  positions: [number, number, number][];
}

// Keep these the same, idea is each line will use white and overlay the hotline together
const antPathOpts = {
  delay: 2500,
  color: "rgba(0, 0, 0, 0)",
};

const Path = ({ positions }: PathProps) => {
  const AntPath = ({ positions }: PathProps) => {
    const context = useLeafletContext();
    useEffect(() => {
      let antPolyline = antPath(positions, antPathOpts);
      context.map.addLayer(antPolyline);
      return () => {
        context.map.removeLayer(antPolyline);
      };
    });
    return null;
  };

  return <AntPath positions={positions} />;
};

export default Path;
