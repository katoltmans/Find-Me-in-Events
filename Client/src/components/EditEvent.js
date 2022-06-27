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

function EditEvent() {
    const [eventTitle, setEventTitle] = useState("");
    const [location, setLocation] = useState("");
    const [city, setCity] = useState("");
    const [state , setState] = useState("");
    const [zipcode , setZipcode] = useState("");
    const [date, setDate] = useState("0");
    const [time, setTime] = useState("0");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState([]);

    //navigate
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        console.log("There it is")
        axios.get(`http://localhost:8000/api/events/${id}`,{withCredentials:true})
        .then(res =>{
            setEventTitle(res.data.event.eventTitle)
            setLocation(res.data.event.location.street)
            setCity(res.data.event.location.city)
            setState(res.data.event.location.state)
            setZipcode(res.data.event.location.zipcode)
            setDate(res.data.event.date)
            setTime(res.data.event.time)
            setDescription(res.data.event.description)
            console.log("DATATAT",res.data.event.date)
        }).catch(err =>{
            console.log("Error on Edit",err)
        })
    }, [])


    const eventDate = (date) => {
        let fixDate = new Date(date);
        return fixDate.toLocaleDateString();
    };
    console.log(eventDate);

    //submithandler
    const submitHandler = (e) => {
        e.preventDefault();
        console.log("hello");
        axios
            .post(
                `http://localhost:8000/api/events/${id}`,
                { eventTitle, location, date, time, description})
            .then((res) => {
                console.log(res.data);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="eventLaunchBar">
            <Card sx={{ maxWidth: 450 }} className="boxDetails">
                <form>
                    <Box
                        sx={{
                            width: 500,
                            maxWidth: "100%",
                        }}
                    >
                        <br />
                        <h1>Edit Event</h1>
                        <TextField
                            fullWidth
                            label="Event Title"
                            id="div"
                            className="textField"
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)}
                        />
                    </Box>
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
                            id="fullWidth"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </Box>
                    <br />
                    <Grid container item spacing={3}>
                        <Grid item xs={6}>
                            <TextField fullWidth label="City" id="fullWidth" />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField fullWidth label="State" id="fullWidth" />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                label="ZipCode"
                                id="fullWidth"
                            />
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
                    </Box>
                    <br />
                    <input
                        type="date"
                        value={eventDate(date)}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
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
        </div>
    );
}

export default EditEvent;
