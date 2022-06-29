import React, { useEffect, useState, useCallback } from "react";
import {
    GoogleMap,
    useJsApiLoader,
    Marker,
    DirectionsRenderer,
    Autocomplete,
} from "@react-google-maps/api";
import axios from "axios";
import {
    Button,
    Grid,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Box } from "@mui/system";

function Gmaps(props) {
    const { ID } = props;

    const [lat, setLat] = useState(37.09024);
    const [lng, setLng] = useState(-95.712891);
    const [destination, setDestination] = useState("");
    const [mode, setMode] = useState("DRIVING");
    const [routeErr, setRouteErr] = useState("");

    axios
        .get(`http://localhost:8000/api/events/${ID}`, {
            withCredentials: true,
        })
        .then((res) => {
            console.log("EVENT: ", res.data);
            console.log("id", ID);
            const results = res.data.event.location;
            const address =
                results.street + ", " + results.city + ", " + results.state;
            console.log("results", address);
            setDestination(address);
        })
        .catch((err) => {
            console.log("Error with getOneEvent request", err);
        });

    useEffect(() => {
        const success = (pos) => {
            console.log(pos);
            setLat(pos.coords.latitude);
            setLng(pos.coords.longitude);
        };
        const err = (error) => {
            console.error(error);
        };
        navigator.geolocation.getCurrentPosition(success, err);
    }, []);

    const center = { lat: lat, lng: lng };

    const apiKey = process.env.REACT_APP_API_KEY;

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: apiKey,
        libraries: ["places"],
    });

    const [map, setMap] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");

    const onLoad = useCallback(
        function callback(map) {
            const bounds = new window.google.maps.LatLngBounds(center);
            map.fitBounds(bounds);
            setMap(map);
        },
        [center]
    );

    async function calculateRoute(e, { destination }) {
        e.preventDefault();
        console.log("center", center);
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService
            .route({
                origin: center,
                destination: destination,
                // eslint-disable-next-line no-undef
                travelMode: google.maps.TravelMode[mode],
            })
            .catch((err) => {
                console.log("google map errors", err);
                setRouteErr(err);
            });
        setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.text);
    }

    return isLoaded ? (
        <Paper elevation={2}>
            <Stack>
                <div style={{height: "350px", width:'800px'}}>
                <GoogleMap
                    mapContainerStyle={{ width: "inherit", height: "inherit" }}
                    zoom={10}
                    center={center}
                    onLoad={onLoad}
                    options={{
                        // zoomControl: false,
                        streetViewControl: false,
                        // mapTypeControl: false,
                        // fullscreenControl: false,
                    }}
                >
                    {directionsResponse && (
                        <DirectionsRenderer directions={directionsResponse} />
                    )}
                    <Marker position={center} title="Your location" />
                </GoogleMap>
                </div>
                <form>
                    <Grid
                        container
                        sx={{ display: "flex", width: "100%", p: 1 }}
                    >
                        <Grid item xs={5} sx={{ display: "flex" }}>
                            {/* onSubmit={(e) => calculateRoute(e, { destination })}> */}
                            <FormControl
                                sx={{
                                    m: 1,
                                    minWidth: 100,
                                    display: "inline-block",
                                }}
                                size="small"
                            >
                                <Typography
                                    variant="h4"
                                    component="h2"
                                    sx={{ fontSize: 18, mr: 1 }}
                                    className="transitBox"
                                >
                                    {" "}
                                    Travel Mode:{" "}
                                </Typography>
                                <Select
                                    value={mode}
                                    sx={{ height: "30px" }}
                                    onChange={(e) => {
                                        setRouteErr("");
                                        setMode(e.target.value);
                                    }}
                                >
                                    <MenuItem value="DRIVING">Driving</MenuItem>
                                    <MenuItem value="BICYCLING">
                                        Bicycling
                                    </MenuItem>
                                    <MenuItem value="TRANSIT">Transit</MenuItem>
                                    <MenuItem value="WALKING">Walking</MenuItem>
                                </Select>
                                {routeErr ? (
                                    <p className="errors">
                                        {" "}
                                        No route could be found between the
                                        origin and destination.
                                    </p>
                                ) : null}
                            </FormControl>

                            {/* <input type="submit" value="GO" /> */}
                        </Grid>
                        <Grid item xs={3} sx={{ display: "flex" }}>
                            <Typography
                                variant="h6"
                                component="h2"
                                sx={{ fontSize: 16 }}
                            >
                                Distance : {distance}
                            </Typography>
                        </Grid>

                        <Grid item xs={4} sx={{ display: "flex" }}>
                            <Typography
                                variant="h6"
                                component="h2"
                                sx={{ fontSize: 16 }}
                            >
                                Duration : {duration}
                            </Typography>
                        </Grid>
                    </Grid>
                </form>

                <Box sx={{ ml: 1, mb: 1 }}>
                    <TextField
                        placeholder="Destination"
                        value={destination}
                        size="small"
                        inputProps={{ style: { fontSize: 12 } }}
                        onSelectCapture={(e) => {
                            setDestination(e.target.value);
                        }}
                    ></TextField>
                    <Button
                        variant="contained"
                        size="small"
                        style={{
                            maxWidth: "32px",
                            maxHeight: "32px",
                            minWidth: "32px",
                            minHeight: "32px",
                        }}
                        sx={{
                            fontSize: 12,
                        }}
                        onClick={(e) => calculateRoute(e, { destination })}
                    >
                        Go
                    </Button>
                </Box>
            </Stack>
        </Paper>
    ) : (
        <div></div>
    );
}

export default Gmaps;
