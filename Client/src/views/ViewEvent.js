import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import EventDetail from "../components/EventDetail";
import { Grid, Stack } from "@mui/material";
import EventStatus from "../components/EventStatus";
import EventComments from "../components/EventComments";

const ViewEvent = () => {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <EventDetail />
                </Grid>
                <Grid item xs={6}>
                    <Stack>
                        <EventStatus />
                        <EventComments />
                    </Stack>
                </Grid>
            </Grid>
        </div>
    );
};

export default ViewEvent;
