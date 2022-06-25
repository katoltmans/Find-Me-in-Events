import React, { useState, useEffect } from "react";
import axios from "axios";
import { Paper } from "@mui/material";

const EventStatus = () => {
    const [attendees, setAttendees] = useState([]);

    return (
        <Paper elevation={2} sx={{ p: 10, m: 5 }}>
            Event Status
        </Paper>
    );
};

export default EventStatus;
