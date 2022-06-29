import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import EventDetail from "../components/EventDetail";
import { Grid, Stack } from "@mui/material";
import EventStatus from "../components/EventStatus";
import EventComments from "../components/EventComments";
import Gmaps from "../components/Gmaps";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { Box } from "@mui/system";
import io from "socket.io-client";

const ViewEvent = () => {
    const [comments, setComments] = useState([]);
    const [event, setEvent] = useState(false);
    const userToken = Cookies.get("userToken");
    const [user, setUser] = useState(null);
    const [refreshCounter, setRefreshCounter] = useState(0);
    const { id } = useParams();
    const [socket] = useState(() => io(":8000"));

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
                // console.log("EVENT: ", res.data);
                setEvent(res.data.event);
                setComments(res.data.event.comments);
            })
            .catch((err) => {
                console.log("Error with getOneEvent request", err);
            });

        socket.on("connection", (socket) => {
            console.log(socket.id);
        });

        socket.on("newComment", (data) => {
            setComments(data);
        });

        socket.on("statusChange", () => {
            axios
                .get(`http://localhost:8000/api/events/${id}`, {
                    withCredentials: true,
                })
                .then((res) => {
                    setEvent(res.data.event);
                    setComments(res.data.event.comments);
                });
        });
    }, [id, userToken, refreshCounter]);

    return (
        <div>
            {!event ? null : (
                <Box sx={{ p: 4 }}>
                    <Grid container spacing={5} sx={{ m: "auto" }}>
                        <Grid item xs={6}>
                            <EventDetail
                                event={event}
                                user={user}
                                id={id}
                                refreshCounter={refreshCounter}
                                setRefreshCounter={setRefreshCounter}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Stack>
                                <Box sx={{ width: "800px" }}>
                                    <Gmaps ID={id} />
                                </Box>
                                <Grid
                                    container
                                    spacing={2}
                                    sx={{ mt: 0.5, mb: 1, width: "815px" }}
                                >
                                    <Grid item xs={4}>
                                        <EventStatus event={event} />
                                    </Grid>
                                    <Grid item xs={8}>
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
                </Box>
            )}
        </div>
    );
};

export default ViewEvent;
