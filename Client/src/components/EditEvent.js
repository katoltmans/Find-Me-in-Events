import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

//Imports from the MUI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { format } from "date-fns";
import { Paper } from "@mui/material";

function EditEvent() {
    const [eventTitle, setEventTitle] = useState("");
    const [location, setLocation] = useState({
        street: "",
        city: "",
        state: "",
        zipcode: "",
    });
    // const [city, setCity] = useState("");
    // const [state , setState] = useState("");
    // const [zipcode , setZipcode] = useState("");
    const [date, setDate] = useState("0");
    const [time, setTime] = useState("0");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState([]);
    const [errors, setErrors] = useState([]);

    //navigate
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        console.log("There it is");
        axios
            .get(`http://localhost:8000/api/events/${id}`, {
                withCredentials: true,
            })
            .then((res) => {
                setEventTitle(res.data.event.eventTitle);
                setLocation(res.data.event.location);
                setDate(res.data.event.date);
                setTime(res.data.event.time);
                setDescription(res.data.event.description);
                console.log("DATATAT", res.data.event.date);
            })
            .catch((err) => {
                console.log("Error on Edit", err.response.data);
            });
    }, []);

    const eventDate = (date) => {
        return format(new Date(date), "yyyy-MM-dd");
    };

    const locationHandler = (e) => {
        setLocation({
            ...location,
            [e.target.name]: e.target.value,
        });
    };

    //submithandler
    const submitHandler = (e) => {
        e.preventDefault();
        console.log("hello");
        axios
            .put(
                `http://localhost:8000/api/events/${id}`,
                { eventTitle, location, date, time, description },
                { withCredentials: true }
            )
            .then((res) => {
                // console.log(res.data);
                navigate("/events/" + id);
            })
            .catch((err) => {
                setErrors(err.response.data.error.errors);
                console.log(err);
            });
    };

    return (
        <div className="eventLaunchBar">
            <Paper elevation={2} sx={{ p: 5 }}>
            <Card sx={{ maxWidth: 450 }} className="boxDetails">
                <form>
                    <Box
                        sx={{
                            width: 500,
                            maxWidth: "100%",
                        }}
                    >
                        <br />
                        <h1 className="myEvent">Edit Event</h1>
                        <TextField
                            fullWidth
                            label="Event Title"
                            id="div"
                            className="textField"
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)}
                        />
                    </Box>
                    {errors.eventTitle ? (
                        <p className="errors">{errors.eventTitle.message}</p>
                    ) : null}
                    <br />
                    <Box
                        sx={{
                            width: 500,
                            maxWidth: "100%",
                        }}
                    >
                        <TextField
                            fullWidth
                            label="Street"
                            name="street"
                            // id="fullWidth"
                            value={location.street}
                            onChange={locationHandler} 
                            
                        />

                    </Box>
                    {errors["location.street"] ? (
                        <p className="errors">
                            {errors["location.street"].message}
                        </p>
                    ) : null}
                    <br />
                    <Grid container item spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="City"
                                id="fullWidth"
                                name="city"
                                value={location.city}
                                onChange={locationHandler}
                            />
                        </Grid>
                        {errors["location.city"] ? (
                            <p className="errors">
                                {errors["location.city"].message}
                            </p>
                        ) : null}
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                label="State"
                                id="fullWidth"
                                name="state"
                                value={location.state}
                                onChange={locationHandler}
                            />
                        </Grid>
                        {errors["location.state"] ? (
                            <p className="errors">
                                {errors["location.state"].message}
                            </p>
                        ) : null}
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                label="ZipCode"
                                id="fullWidth"
                                name="zipcode"
                                value={location.zipcode}
                                onChange={locationHandler}
                            />
                            {errors["location.zipcode"] ? (
                                <p className="errors">
                                    {errors["location.zipcode"].message}
                                </p>
                            ) : null}
                        </Grid>
                    </Grid>
                    <br />
                    <Box
                        sx={{
                            width: 500,
                            maxWidth: "100%",
                        }}
                    >
                        <TextField
                            fullWidth
                            label="Description"
                            id="fullWidth"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {errors.description ? (
                            <p className="errors">
                                {" "}
                                {errors.description.message}
                            </p>
                        ) : null}
                    </Box>
                    <br />
                    <input
                        type="date"
                        value={eventDate(date)}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    {errors.date ? (
                        <p className="errors"> {errors.date.message}</p>
                    ) : null}
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                    {errors.time ? (
                        <p className="errors"> {errors.time.message}</p>
                    ) : null}
                    <br />
                    <br />
                    <Stack
                        spacing={2}
                        direction="row"
                        className="eventLaunchButton"
                    >
                        <Button variant="outlined" onClick={submitHandler}>
                            Update Event
                        </Button>
                    </Stack>
                    <br />
                </form>
            </Card>
            </Paper>
        </div>
    );
}

export default EditEvent;
