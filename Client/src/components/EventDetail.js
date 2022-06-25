import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
    Grid,
    Paper,
    Typography,
    Button,
    MenuItem,
    IconButton,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuDropdown from "./MenuDropdown";

const EventDetail = () => {
    const navigate = useNavigate();
    const [event, setEvent] = useState({});
    const { id } = useParams();
    console.log("ID:", id);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/events/${id}`, {
                withCredentials: true,
            })
            .then((res) => {
                console.log("EVENT: ", res.data);
                setEvent(res.data.event);
            })
            .catch((err) => {
                console.log("Error with getOneEvent request", err);
            });
    }, []);

    const handleDelete = () => {
        axios
            .delete(`http://localhost:8000/api/events/${id}`)
            .then((res) => {
                console.log(res);
                // setEvents(events.filter((event) => event._id !== eventId));
                navigate("/");
            })
            .catch((err) => {
                console.log("Error with delete request", err);
            });
    };

    const routeToUpdate = () => {
        navigate("/");
    };

    // Format date of event
    const eventDate = (date) => {
        let fixDate = new Date(date);
        return fixDate.toLocaleDateString();
    };

    return (
        <Paper elevation={2} sx={{ p: 10 }}>
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={11}>
                    <Typography variant="h4" component="h2">
                        {event.eventTitle}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <MenuDropdown
                        dropdownButton={
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        }
                    >
                        <MenuItem
                            onClick={() => routeToUpdate(event._id)}
                            disableRipple
                        >
                            Edit
                        </MenuItem>
                        <MenuItem
                            onClick={() => handleDelete(event._id)}
                            disableRipple
                        >
                            Delete
                        </MenuItem>
                    </MenuDropdown>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} sx={{ mb: 2 }}>
                    <img
                        src="/image/Meetup.png"
                        alt="placeholder"
                        width="100%"
                    />
                </Grid>
            </Grid>
            <Grid container item spacing={5} sx={{ display: "flex", mb: 2 }}>
                <Grid item xs={7}>
                    <Typography variant="h6" component="h2">
                        {event.location}
                    </Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography variant="h6" component="h2">
                        {eventDate(event.date)} | {event.time}
                    </Typography>
                </Grid>
            </Grid>
            <Typography variant="body1" component="h2" sx={{ mb: 3 }}>
                {event.description}
            </Typography>

            <MenuDropdown
                dropdownButton={
                    <Button
                        variant="contained"
                        disableElevation
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        Update Status
                    </Button>
                }
            >
                <MenuItem
                    onClick={(e) => {
                        console.log("Going");
                    }}
                    disableRipple
                >
                    Going
                </MenuItem>
                <MenuItem
                    onClick={(e) => {
                        console.log("Maybe");
                    }}
                    disableRipple
                >
                    Maybe
                </MenuItem>
                <MenuItem
                    onClick={(e) => {
                        console.log("Can't Go");
                    }}
                    disableRipple
                >
                    Can't Go
                </MenuItem>
            </MenuDropdown>
        </Paper>
    );
};

export default EventDetail;
