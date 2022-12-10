// Main Dev: johalexander
// Supporting Devs: Gustav, CookieNess, PossibleNPC
import "../Drawer/DrawerComponents.css";
import React, { FC, useEffect, useState } from "react";
import { theme } from "../Theme/Theme";
import { ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  List,
  Paper,
  Skeleton,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import { Clear, Search } from "@material-ui/icons";
import ClientRequestHeaders from "../Utils/client-request-headers";
import useDebounce from "../../Hooks/UseDebounce";
import TripCard from "../Trip/TripCard";
import HOSTNAME from "../Utils/hostname";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

interface RidesMeasurementComponentProps {
  addGraphComponent(index: number, tripID: string): any;
}

const RidesMeasurementComponent: FC<RidesMeasurementComponentProps> = ({
  addGraphComponent,
}) => {
  const [tab, setTab] = useState(0);
  const [selectedRides, setSelectedRides] = useState<any[]>([]);
  const [selectedMeasurements, setSelectedMeasurements] = useState<any[]>([]);
  const [rideInfos, setRideInfos] = useState<any[]>([]);
  const [filteredRideInfos, setFilteredRideInfos] = useState<any[]>([]);
  const [filterBy, setFilterBy] = useState("");
  const [dayNightFilter, setDayNightFilter] = useState(0);

  const debouncedSearchTerm: string = useDebounce<string>(filterBy, 250);

  const handleRideItemClick = (
    _: React.MouseEvent<HTMLDivElement, MouseEvent>,
    taskID: number,
    tripID: string
  ) => {
    addGraphComponent(taskID, tripID);
    setSelectedRides([...selectedRides, taskID]);
  };

  const handleChange = (event: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };

  const clear = () => {
    if (tab === 0) setSelectedRides([]);
    if (tab === 1) setSelectedMeasurements([]);
    setFilterBy("");
    setDayNightFilter(0);
  };

  const onSearch = (event: any) => {
    setFilterBy(event.target.value);
  };

  const fetchRides = async () => {
    const ridesResponse = await fetch(`http://${HOSTNAME}:8000/trips`, {
      headers: ClientRequestHeaders,
    });

    const rides = await ridesResponse.json();

    return Promise.all(rides["trips"]);
  };

  const filterCity = (ridesArray: any) => {
    if (ridesArray["start_position_city"] && ridesArray["end_position_city"]) {
      if (
        ridesArray["start_position_city"].includes(filterBy) ||
        ridesArray["end_position_city"].includes(filterBy)
      ) {
        return ridesArray;
      }
    }
  };

  const filterDayNight = (ridesArray: any) => {
    const start_time_hours = new Date(ridesArray["start_time_utc"]).getHours();
    if (dayNightFilter === 1) {
      if (start_time_hours >= 0 && start_time_hours <= 12) {
        return ridesArray;
      }
    } else {
      if (start_time_hours > 12 && start_time_hours <= 24) {
        return ridesArray;
      }
    }
  };

  const { data: ridesQuery, isLoading: ridesIsLoading } = useQuery(
    ["rides"],
    fetchRides
  );

  useEffect(() => {
    if (ridesQuery) {
      setRideInfos(ridesQuery);
    }
  }, [ridesQuery]);

  useEffect(() => {
    let matches: any = [];
    if (debouncedSearchTerm && dayNightFilter) {
      matches = rideInfos.filter(filterCity);
      matches = matches.filter(filterDayNight);
      setFilteredRideInfos(matches);
    } else if (debouncedSearchTerm && !dayNightFilter) {
      matches = rideInfos.filter(filterCity);
    }
    if (dayNightFilter && !debouncedSearchTerm) {
      matches = rideInfos.filter(filterDayNight);
    }
    setFilteredRideInfos(matches);
  }, [debouncedSearchTerm, dayNightFilter]);

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          background: "transparent",
          width: "100%",
          top: "48px",
          height: "calc(100% - (57px + 48px))",
          display: "absolute",
          overflow: "auto",
        }}
        square={true}
      >
        <TabPanel value={tab} index={0}>
          {ridesIsLoading && (
            <Stack sx={{ margin: "auto", width: "100%" }} spacing={0.1}>
              {Array.from(Array(15)).map((_, i) => {
                return (
                  <Skeleton
                    key={`Skeleton ${i}`}
                    variant="rectangular"
                    height={72}
                  />
                );
              })}
            </Stack>
          )}
          <List sx={{ background: "transparent", width: "100%", padding: "0" }}>
            <>
              {!filterBy &&
                !dayNightFilter &&
                Array.from(Array(rideInfos.length)).map((_, i) => {
                  return (
                    <TripCard
                      key={"Trip " + rideInfos[i]["task_id"]}
                      selectedRides={selectedRides}
                      rideInfos={rideInfos}
                      i={i}
                      onClick={(event) =>
                        handleRideItemClick(
                          event,
                          rideInfos[i]["task_id"],
                          rideInfos[i]["id"]
                        )
                      }
                    />
                  );
                })}
              {(filterBy || dayNightFilter) &&
                Array.from(Array(filteredRideInfos.length)).map((_, i) => {
                  return (
                    <TripCard
                      key={"Trip " + filteredRideInfos[i]["task_id"]}
                      selectedRides={selectedRides}
                      rideInfos={filteredRideInfos}
                      i={i}
                      onClick={(event) =>
                        handleRideItemClick(
                          event,
                          filteredRideInfos[i]["task_id"],
                          filteredRideInfos[i]["id"]
                        )
                      }
                    />
                  );
                })}
            </>
          </List>
        </TabPanel>
      </Paper>
      <Paper
        elevation={1}
        sx={{
          width: "100%",
          height: "48px",
          position: "absolute",
          top: 0,
          borderRadius: "0 0 0 0",
        }}
      >
        <Tabs value={tab} onChange={handleChange} selectionFollowsFocus>
          <Tab label="Trips" />
        </Tabs>
      </Paper>

      <Paper
        elevation={4}
        sx={{
          width: "100%",
          height: "57px",
          position: "absolute",
          bottom: 0,
          my: "0px",
          borderRadius: "0px 0px 10px 10px",
          display: "inline-block",
        }}
      >
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "" }}
            onChange={onSearch}
            value={filterBy}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <Search />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <Button
            sx={{ height: 20 }}
            className={`
            day_night_filter_button 
            ${dayNightFilter === 0 ? "button_clock" : ""}
            ${dayNightFilter === 1 ? "button_day" : ""}
            ${dayNightFilter === 2 ? "button_night" : ""}
            `}
            onClick={() => {
              if (dayNightFilter === 2) {
                setDayNightFilter(0);
              } else {
                setDayNightFilter(dayNightFilter + 1);
              }
            }}
          ></Button>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            color="error"
            sx={{ p: "10px", mr: 1 }}
            aria-label="directions"
            disabled={
              !(
                selectedRides.length ||
                selectedMeasurements.length ||
                filterBy !== "" ||
                dayNightFilter
              )
            }
            onClick={clear}
          >
            <Clear />
          </IconButton>
        </Paper>
      </Paper>
    </ThemeProvider>
  );
};

export default RidesMeasurementComponent;
