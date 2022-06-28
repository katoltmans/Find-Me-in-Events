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

const EventDetail = (props) => {
    const navigate = useNavigate();
    const { event, user, id } = props;
    console.log(event);

    const handleDelete = () => {
        axios
            .delete(`http://localhost:8000/api/events/${id}`, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);
                // setEvents(events.filter((event) => event._id !== eventId));
                navigate("/events");
            })
            .catch((err) => {
                console.log("Error with delete request", err);
            });
    };

    const updateStatus = (status) => {
        axios
            .put(
                `http://localhost:8000/api/decision/${id}`,
                {
                    decision: status,
                    personId: user._id,
                },
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                console.log("Status response", res);
                navigate("/events/" + id);
                console.log("Successfully navigated to /events/" + id);
            })
            .catch((err) => {
                console.log("Error with update status", err);
            });
    };

    const routeToUpdate = () => {
        navigate(`/event/edit/${id}`);
    };

    // Format date of event
    const eventDate = (date) => {
        let fixDate = new Date(date);
        return fixDate.toLocaleDateString();
    };

    return (
        <Paper elevation={2} sx={{ p: 10, height: "550px" }}>
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={11}>
                    <Typography variant="h4" component="h2">
                        {event.eventTitle}
                    </Typography>
                </Grid>
                {user._id === event.createdBy ? (
                    <Grid item xs={1}>
                        <MenuDropdown
                            dropdownButton={
                                <IconButton sx={{ color: "#ff1622" }}>
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
                ) : null}
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
                        {`${event.location.street},${event.location.city},${event.location.state},${event.location.zipcode}`}
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
                        updateStatus("Going");
                    }}
                    disableRipple
                >
                    Going
                </MenuItem>
                <MenuItem
                    onClick={(e) => {
                        updateStatus("Maybe");
                    }}
                    disableRipple
                >
                    Maybe
                </MenuItem>
                <MenuItem
                    onClick={(e) => {
                        updateStatus("Not-Going");
                    }}
                    disableRipple
                >
                    Not Going
                </MenuItem>
            </MenuDropdown>
        </Paper>
    );
};

export default EventDetail;
