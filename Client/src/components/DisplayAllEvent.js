import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//Mui imports
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

function DisplayAllEvent() {
    const [eventList, setEventList] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/events",{ withCredentials: true })
            .then((res) => {
                setEventList(res.data.events);
                console.log(res.data.events);
            })
            .catch((err) => {
                console.log("error in front end DispalyALl", err);
            });
    }, []);

    // how to fix date to numeric
    const eventDate = (date) => {
        let fixDate = new Date(date);
        return fixDate.toLocaleDateString();
    };

    return (
        <div >
            {eventList.map((event) => (
                <div key={event._id} className="displayAll">
                    <Card sx={{ maxWidth: 450}}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={event.image}
                                alt={event.image}
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                >
                                    {event.eventTitle}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {`${event.location.street},
                                    ${event.location.city},
                                    ${event.location.state},
                                    ${event.location.zipcode}`}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {eventDate(event.date)}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {event.time}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                <Link to={`/events/${event._id}`}>
                                    {" "}
                                    View Details
                                </Link>
                            </Button>
                        </CardActions>
                    </Card>
                </div>
            ))}
        </div>
    );
}

export default DisplayAllEvent;
