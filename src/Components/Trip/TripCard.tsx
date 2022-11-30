import {IconButton, ListItem, ListItemButton, ListItemText,} from "@mui/material";
import {Add} from "@mui/icons-material";
import React from "react";

const TripCard = (props: {
  selectedRides: any[];
  rideInfos: any[];
  i: number;
  onClick: (event: any) => void;
}) => {
  return (
    <ListItem
      sx={{
        padding: "0",
        width: "100%",
        background: "transparent",
      }}
    >
      <ListItemButton
        sx={{
          width: "100%",
          backgroundColor: "transparent",
          borderBottom: 1,
          borderColor: "rgba(0,0,0,0.3)",
        }}
        selected={props.selectedRides.includes(
          props.rideInfos[props.i]["task_id"]
        )}
        onClick={props.onClick}
      >
        <ListItemText
          primary={`Trip ${props.rideInfos[props.i]["task_id"]}`}
          secondary={`${
            props.rideInfos[props.i]["start_position_city"] ?? "Empty"
          } → ${props.rideInfos[props.i]["end_position_city"] ?? "Empty"}`}
          sx={{ wordWrap: "break-word" }}
        />
        <IconButton aria-label="icon">
          <Add />
        </IconButton>
      </ListItemButton>
    </ListItem>
  );
};

export default TripCard;
