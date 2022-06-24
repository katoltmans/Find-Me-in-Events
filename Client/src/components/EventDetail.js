import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid, Paper, Typography, Button } from "@mui/material";

const EventDetail = (props) => {
    const navigate = useNavigate();
    const [event, setEvent] = useState({});
    const { id } = useParams();
    console.log("ID:", id);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/events/${id}`)
            .then((res) => {
                console.log("EVENT: ", res.data);
                setEvent(res.data);
            })
            .catch((err) => {
                console.log("Error with getOneEvent request", err);
            });
    }, []);

    return (
        <Paper elevation={2} sx={{ p: 10, m: 5 }}>
            <Typography variant="h2" component="h2">
                {event.eventTitle}
            </Typography>
            <img src="/" alt="placeholder" />
            <Grid container item spacing={5} sx={{ display: "flex" }}>
                <Grid item xs={6}>
                    {event.location}
                </Grid>
                <Grid item xs={6}>
                    {event.date} | {event.time}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default EventDetail;
