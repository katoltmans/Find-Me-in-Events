import React, { useState, useEffect } from "react";
import axios from "axios";
import { Paper, Typography } from "@mui/material";

const EventStatus = () => {
    const [attendees, setAttendees] = useState([]);

    return (
        <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                Look Who's Attending
            </Typography>
            <Typography variant="h6" component="h3" sx={{ fontSize: 15 }}>
                Going
            </Typography>
            <ul>
                <li>Will Set Map Function</li>
                <li>Once I Have</li>
                <li>Axios Route</li>
            </ul>
            <Typography variant="h6" component="h3" sx={{ fontSize: 15 }}>
                Maybe
            </Typography>
            <ul>
                <li>Will Set Map Function</li>
                <li>Once I Have</li>
                <li>Axios Route</li>
            </ul>
            <Typography variant="h6" component="h3" sx={{ fontSize: 15 }}>
                Can't Go
            </Typography>
            <ul>
                <li>Will Set Map Function</li>
                <li>Once I Have</li>
                <li>Axios Route</li>
            </ul>
        </Paper>
    );
};

export default EventStatus;
