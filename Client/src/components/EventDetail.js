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
            img
        </Paper>
    );
};

export default EventDetail;


return (
    <Box sx={{ pt: 5, mx: 15 }}>
        <Grid container spacing={10}>
            <Grid item xs={6}>
                <Paper
                    elevation={2}
                    sx={{
                        p: 3,
                    }}
                >
                    <Typography
                        variant="h3"
                        component="h1"
                        sx={{ fontSize: 25 }}
                    >
                        Registration
                    </Typography>
                    {regErr && (
                        <List sx={{ mb: 5 }}>
                            {regErr.map((error, index) => {
                                return (
                                    <ListItem
                                        key={index}
                                        sx={{ color: "error.main" }}
                                    >
                                        {error}
                                    </ListItem>
                                );
                            })}
                        </List>
                    )}
                    <Box>
                        <Grid container spacing={3}>
                            <Grid container item spacing={1}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        name="firstName"
                                        label="First Name"
                                        variant="outlined"
                                        onChange={onChangeHandler}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        name="lastName"
                                        label="Last Name"
                                        variant="outlined"
                                        onChange={onChangeHandler}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container item spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        name="emailId"
                                        label="Email"
                                        variant="outlined"
                                        onChange={onChangeHandler}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container item spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        name="password"
                                        type="password"
                                        label="Password"
                                        variant="outlined"
                                        onChange={onChangeHandler}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        name="confirmPassword"
                                        type="password"
                                        label="Confirm Password"
                                        variant="outlined"
                                        onChange={onChangeHandler}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Button
                            variant="contained"
                            sx={{ mt: 3 }}
                            onClick={OnSubmitHandlerRegistration}
                        >
                            Submit
                        </Button>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper
                    elevation={2}
                    sx={{
                        p: 3,
                    }}
                >
                    <Typography
                        variant="h3"
                        component="h1"
                        sx={{ fontSize: 25 }}
                    >
                        Login
                    </Typography>
                    <List sx={{ mb: 5, color: "error.main" }}>
                        {logErr && <p>{logErr}!!</p>}
                    </List>
                    <Box>
                        <Grid container spacing={3}>
                            <Grid container item spacing={1}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        name="emailId"
                                        label="Email"
                                        variant="outlined"
                                        onChange={onChangeHandler}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container item spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        name="password"
                                        type="password"
                                        label="Password"
                                        variant="outlined"
                                        onChange={onChangeHandler}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Button
                            variant="contained"
                            sx={{ mt: 3 }}
                            onClick={OnSubmitHandlerLogin}
                        >
                            Login
                        </Button>
                    </Box>
                </Paper>
            </Grid>
