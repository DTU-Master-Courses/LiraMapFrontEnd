// Main Dev: CookieNess
// Supporting Devs: Gustav, johalexander, PossibleNPC
import { Rnd } from "react-rnd";
import React, { useState } from "react";
import "../Drawer/DrawerComponents.css";
import { Button, Tooltip } from "@mui/material";

interface WindowProps {
  id: number;
  x: number;
  y: number;
  width: string;
  height: string;
  windowName?: string;
  hidable?: boolean;
  hidden?: boolean;
  hideWindow?: (windowId: number) => any;
  closeWindow: (windowId: number) => any;
  focusWindow: (windowId: number) => number;
  children: React.ReactNode;
}

const Window = ({
  id,
  x,
  y,
  width,
  height,
  windowName,
  hidable,
  hidden,
  hideWindow,
  closeWindow,
  focusWindow,
  children,
}: WindowProps) => {
  const [uniqueZ, setUniqueZ] = useState(0);

  const example = windowName?.split(": ")[1];
  console.log(example);

  return (
    <Rnd
      className={`draggable_component_container`}
      bounds="body"
      dragHandleClassName={"draggable_handle"}
      default={{
        x: x,
        y: y,
        width: width,
        height: height,
      }}
      minWidth={300}
      style={{
        zIndex: 1000 + uniqueZ,
        display: hidden ? "none" : "inline-block",
      }}
      onMouseDown={(_: MouseEvent) => {
        setUniqueZ(focusWindow(id));
      }}
    >
      <div className="draggable_handle">
        <span className="window_name">{windowName}</span>
        <button
          style={{ display: hidable ? "inline-block" : "none" }}
          className="hide_component_btn"
          onClick={() => hideWindow!(id)}
        ></button>
        <button
          style={{ marginRight: hidable ? "-70px" : "0px" }}
          className="close_component_btn"
          onClick={() => closeWindow(id)}
        ></button>
        <Tooltip title="Download CSV to see all data for the trip">
          <Button
            sx={{ marginLeft: -1.8, height: 17, marginTop: 0.2 }}
            style={{ display: hidable ? "inline-block" : "none" }}
            className="download_csv_button"
          ></Button>
        </Tooltip>
      </div>
      <div className="draggable_component_container_content">
        {React.Children.only(children)}
      </div>
    </Rnd>
  );
};

export default Window;
