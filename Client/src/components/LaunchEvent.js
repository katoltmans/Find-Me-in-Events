import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

//Imports from the MUI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { Paper } from "@mui/material";
// import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import { statesArray } from "./utils";
import io from "socket.io-client";

function LaunchEvent() {
  const { state: user } = useLocation();
  const [eventTitle, setEventTitle] = useState("");
  const [location, setLocation] = useState({
    street: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  // const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const [socket] = useState(() => io(":8000"));

  //navigate
  const navigate = useNavigate();

  //submithandler
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/events",
        { eventTitle, location, date, time, description },
        { withCredentials: true }
      )
      .then((res) => {
        // console.log('new event data',res.data);
        toast.success("Successfully Created New Event !!");
        navigate("/events", { state: user });
        socket.emit('newEvent', res.data)
        
      })
      .catch((err) => {
        setErrors(err.response.data.error.errors);
        toast.error("Error while creating new event");
        console.log(err.response.data);
      });
  };

  const locationHandler = (e) => {
    setLocation({
      ...location,
      [e.target.name]: e.target.value,
    });
  };

  const handleTimings = (e) => {
    const time = e.target.value;
    const [hrs, min] = time.split(":");
    if (Number(hrs) > 12) {
      console.log("`${Number(hrs) - 12}:{min}`", `${Number(hrs) - 12}:{min}`);
      setTime(`${Number(hrs) - 12}:${min} PM`);
    } else if (Number(hrs) == 24) {
      setTime(`00:${min} AM`);
    } else if (Number(hrs) == 12) {
      setTime(`12:${min} PM`);
    } else {
      setTime(`${hrs}:${min} AM`);
    }
  };

  if (!user) {
    return (
      <>
        <h1>Please Login or Register to create an event</h1>
      </>
    );
  }

  return (
    <div className="eventLaunchBar">
      <Paper elevation={2} sx={{ p: 5 }}>
      <Card sx={{ maxWidth: 450 }} className="boxDetails">
        <form onSubmit={submitHandler}>
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
            }}
          >
            <br />
            <h1 className="myEvent">Launch an Event</h1>
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
              id="fullWidth"
              name="street"
              value={location.street}
              onChange={locationHandler}
            />
          </Box>
          {errors["location.street"] ? (
            <p className="errors">{errors["location.street"].message}</p>
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
              {errors["location.city"] ? (
                <p className="errors">{errors["location.city"].message}</p>
              ) : null}
            </Grid>
            {/* <Grid item xs={3}>
              <InputLabel id="demo-simple-select-label">State</InputLabel>
              <Select
                style={{ width: 100, height: 50 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={location.state}
                label="State"
                name="state"
                onChange={locationHandler}
              >
                {statesArray.map((state) => (
                  <MenuItem value={state}>{state}</MenuItem>
                ))}
              </Select>
              {errors["location.state"] ? (
                <p className="errors">{errors["location.state"].message}</p>
              ) : null}
            </Grid> */}
            <Grid item xs={3}>
              <input
                style={{ width: 100, height: 50 }}
                placeholder="State"
                type="text"
                list="states"
                name="state"
                id="state"
                value={location.state}
                onChange={locationHandler}
              />
              <datalist id="states">
                {statesArray.map((state) => (
                  <option value={state} />
                ))}
              </datalist>

              {errors["location.state"] ? (
                <p className="errors">{errors["location.state"].message}</p>
              ) : null}
            </Grid>

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
                <p className="errors">{errors["location.zipcode"].message}</p>
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
          </Box>
          {errors.description ? (
            <p className="errors">{errors.description.message}</p>
          ) : null}

          <br />
          <Grid item xs={3}>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {errors.date ? (
              <p className="errors"> {errors.date.message}</p>
            ) : null}
            <input type="time" value={time} onChange={handleTimings} />
          </Grid>
          {errors.time ? <p className="errors">{errors.time.message}</p> : null}
          <br />
          <br />
          <Stack spacing={2} direction="row" className="eventLaunchButton">
            <Button variant="outlined" type="submit">
              Create an Event
            </Button>
          </Stack>
          <br />
        </form>
      </Card>
      </Paper>
    </div>
  );
}

export default LaunchEvent;
