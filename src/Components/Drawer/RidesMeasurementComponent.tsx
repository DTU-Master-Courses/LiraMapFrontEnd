import '../Drawer/DrawerComponents.css';
import { FC, useState } from 'react';
import { theme } from '../Theme/Theme'
import { ThemeProvider } from '@mui/material/styles';
import { 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemText, 
    Paper, 
    IconButton, 
    Tab, 
    Tabs,
    Stack, 
    Button,
    Box
} from '@mui/material';
import { Add } from '@mui/icons-material';

const NUMBER_OF_RIDES = 100;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return(
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}

interface RidesMeasurementComponentProps {
    addGraphComponent(title: string): any,
    setRidesIsRendered: any;
}

const RidesMeasurementComponent: FC<RidesMeasurementComponentProps> = ({setRidesIsRendered, addGraphComponent}) => {
    const [tab, setTab] = useState(0);
    const [selectedRides, setSelectedRides] = useState<number[]>([]);
    const [selectedMeasurements, setSelectedMeasurements] = useState<number[]>([]);

    const handleRideItemClick = ( _: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        addGraphComponent(`Trip ${index}`);
        setSelectedRides([...selectedRides, index]);
    };

    const handleMeasurementItemClick = ( _: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        // TODO: handle measurement clicks
        setSelectedMeasurements([...selectedMeasurements, index]);
    };

    const handleChange = (event: React.SyntheticEvent, newTab: number) => {
        setTab(newTab);
    };

    const clear = () => {
        if (tab === 0) setSelectedRides([]);
        if (tab === 1) setSelectedMeasurements([]);
    };

    return(
        <ThemeProvider theme={theme}>
            <Paper
                sx={{ width: '100%', height: '100%', display: 'inline-block', borderRadius: '10px', bgcolor: 'background.paper', overflow: 'auto' }}
            >
                <TabPanel
                    value={tab}
                    index={0}
                >
                    <List
                        sx={{ width: '100%', marginTop: '48px', overflow: 'scroll' }}
                    >
                        <>
                            {Array.from(Array(NUMBER_OF_RIDES)).map((_, i) => {
                                return(<ListItem
                                    key={'Trip ' + i}
                                    sx={{ width: '100%', bgcolor: 'background.paper' }}
                                >
                                    <ListItemButton
                                        sx={{ borderRadius: '10px' }}
                                        selected={selectedRides.includes(i)}
                                        onClick={(event) => handleRideItemClick(event, i)}
                                    >
                                        <ListItemText primary={`Trip ${i}`} secondary={`København -> Lyngby`} /> 
                                        <IconButton aria-label="icon">
                                            <Add />
                                        </IconButton>
                                    </ListItemButton>
                                </ListItem>)
                            })};
                        </>
                    </List>
                </TabPanel>
                <TabPanel
                    value={tab} 
                    index={1}
                >
                    <List
                        sx={{ width: '100%', marginTop: '48px', overflow: 'scroll' }}
                    >
                        <>
                            {Array.from(Array(NUMBER_OF_RIDES)).map((_, i) => {
                                return(<ListItem
                                    key={'Measurement ' + i}
                                    sx={{ width: '100%', bgcolor: 'background.paper' }}
                                >
                                    <ListItemButton
                                        sx={{ borderRadius: '10px' }}
                                        selected={selectedMeasurements.includes(i)}
                                        onClick={(event) => handleMeasurementItemClick(event, i)}
                                    >
                                        <ListItemText primary={`Measurement ${i}`} secondary={`acc.xyz`} /> 
                                        <IconButton aria-label="icon">
                                            {/*
                                                TODO: change icon for editing measurement
                                            */}
                                            <Add />
                                        </IconButton>
                                    </ListItemButton>
                                </ListItem>)
                            })};
                        </>
                    </List>
                </TabPanel>
            </Paper>
            <Paper
                elevation={1}
                sx={{ width: '100%', height: '48px', position: 'absolute', top: 0, borderRadius: '0 0 0 0' }}
            >
                <Tabs 
                    value={tab}
                    onChange={handleChange}
                    selectionFollowsFocus>
                    <Tab label="Trips" />
                    <Tab label="Measurements" />
                </Tabs>
            </Paper>

            <Paper
                elevation={4}
                sx={{ width: '100%', height: '57px', position: 'absolute', bottom: 0, my: '0px', borderRadius: '0px 0px 10px 10px', display: 'inline-block' }}
            >
                <Stack 
                    sx={{ padding: '10px', overflow: 'auto' }}
                    spacing={1} 
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch">
                    {tab === 0 && <Button variant="outlined" fullWidth>Trip Details</Button>}
                    {tab === 1 && <Button variant="outlined" fullWidth>Create</Button>}
                    <Button variant="text" color="error" onClick={clear} disabled={tab === 0 ? selectedRides.length < 1 : selectedMeasurements.length < 1} fullWidth>Clear</Button>
                </Stack>
            </Paper>
        </ThemeProvider>
    );
};

export default RidesMeasurementComponent;
