import { Hotline } from "leaflet-hotline-react";
import { useLeafletContext } from "@react-leaflet/core";
import { useEffect } from "react";

interface HotlineProps {
  positions: [number, number, number][];
}

const LiraHotline = ({ positions }: HotlineProps) => {
  return (
    <Hotline
      positions={positions}
      weight={3}
      min={0}
      max={0.3}
      palette={{
        0.0: "green",
        0.5: "yellow",
        1.0: "red",
      }}
    />
  );
};

export default LiraHotline;
