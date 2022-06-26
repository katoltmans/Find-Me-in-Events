import React, { useState, useEffect } from "react";
import axios from "axios";
import { Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const EventStatus = (props) => {
    const [attendees, setAttendees] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/events/${id}`, {
                withCredentials: true,
            })
            .then((res) => {
                setAttendees(res.data.event.going);
                console.log("Attendees: ", res.data.event.going);
            })
            .catch((err) => {
                console.log("Error EventController going request", err);
            });
    }, []);

    return (
        <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                Look Who's Attending
            </Typography>
            <Typography
                variant="h6"
                component="h3"
                sx={{ fontSize: 15, color: "#0e934e" }}
            >
                Going
            </Typography>
            <ul>
                {attendees.map((a, index) => {
                    if (a.decision === "Going") {
                        return (
                            <li
                                key={index}
                                style={{
                                    color: "#0e934e",
                                    overflowWrap: "break-word",
                                }}
                            >
                                {a.personId}
                            </li>
                        );
                    }
                })}
            </ul>
            <Typography
                variant="h6"
                component="h3"
                sx={{ fontSize: 15, color: "#c49224" }}
            >
                Maybe
            </Typography>
            <ul>
                {attendees.map((a, index) => {
                    if (a.decision === "Maybe") {
                        return (
                            <li
                                key={index}
                                style={{
                                    color: "#c49224",
                                    overflowWrap: "break-word",
                                }}
                            >
                                {a.personId}
                            </li>
                        );
                    }
                })}
            </ul>
            <Typography
                variant="h6"
                component="h3"
                sx={{
                    fontSize: 15,
                    color: "#992e2e",
                }}
            >
                Can't Go
            </Typography>
            <ul>
                {attendees.map((a, index) => {
                    if (a.decision === "Not-Going") {
                        return (
                            <li
                                key={index}
                                style={{
                                    color: "#992e2e",
                                    overflowWrap: "break-word",
                                }}
                            >
                                {a.personId}
                            </li>
                        );
                    }
                })}
            </ul>
        </Paper>
    );
};

export default EventStatus;
