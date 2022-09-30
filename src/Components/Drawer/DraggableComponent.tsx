import { Typography } from "@material-ui/core";
import { Rnd } from "react-rnd";

const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #000000",
    background: "#ffffff",
    zIndex: 9999,
    position: 'absolute'
  } as const;

const DraggableComponent = () => (
    <Rnd
        style={style}
        default={{
        x: 200,
        y: 200,
        width: 200,
        height: 200
        }}
        bounds="window"
    >
        <Typography>
            This is a test box.
        </Typography>
    </Rnd>
);

export default DraggableComponent;
