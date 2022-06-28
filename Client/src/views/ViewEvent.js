import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import EventDetail from "../components/EventDetail";
import { Grid, Stack } from "@mui/material";
import EventStatus from "../components/EventStatus";
import EventComments from "../components/EventComments";
import Gmaps from "./Gmaps";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { Box } from "@mui/system";

const ViewEvent = () => {
    const [comments, setComments] = useState([]);
    const [event, setEvent] = useState(false);
    const userToken = Cookies.get("userToken");
    const [user, setUser] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        console.log("hello there");
        if (userToken) {
            const user = jwtDecode(userToken);
            console.log("user", user);
            setUser(user);
        }
        axios
            .get(`http://localhost:8000/api/events/${id}`, {
                withCredentials: true,
            })
            .then((res) => {
                console.log("EVENT: ", res.data);
                setEvent(res.data.event);
                setComments(res.data.event.comments);
            })
            .catch((err) => {
                console.log("Error with getOneEvent request", err);
            });
    }, [id, userToken]);

    return (
        <div>
            {!event ? null : (
                <Grid container sx={{ mt: 5, mx: 2, height: "550px" }}>
                    <Grid item xs={6} width="100%">
                        <EventDetail event={event} user={user} id={id} />
                    </Grid>
                    <Grid item xs={6}>
                        <Stack width="100%" sx={{ mt: 5, ml: 2 }}>
                            <Box sx={{ height: "250px" }}>
                                <Gmaps ID = {id} />
                            </Box>
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={4}>
                                    <EventStatus />
                                </Grid>
                                <Grid item xs={7}>
                                    <EventComments
                                        comments={comments}
                                        setComments={setComments}
                                        user={user}
                                        id={id}
                                    />
                                </Grid>
                            </Grid>
                        </Stack>
                    </Grid>
                </Grid>
            )}
        </div>
    );
};

export default ViewEvent;
