import React, { useState, useEffect } from "react";
import axios from "axios";
import { CardActionArea } from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../App.css";

const DisplayGoingEvents = ({ eventsToshow, sectionId }) => {
    const handlehover = (e, indx) => {
        let add = document.querySelectorAll("#" + sectionId);
        for (let i = 0; i < add.length; i++) {
            if (i == indx) {
                add[i].className = "hoverEffect";
            }
        }
    };

    const out = (e) => {
        let reset = document.querySelectorAll("#" + sectionId);
        for (let i = 0; i < reset.length; i++) {
            reset[i].className = "";
        }
    };

    const eventDate = (date) => {
        let fixDate = new Date(date);
        return fixDate.toLocaleDateString();
    };

    return (
        <div className="displayAll">
            {eventsToshow.map((event, i) => (
                <div key={event._id} className="displayAll">
                    <div
                        id={sectionId}
                        className=""
                        onMouseOver={(e) => {
                            handlehover(e, i);
                        }}
                        onMouseOut={(e) => {
                            out(e);
                        }}
                    >
                        <Card sx={{ maxWidth: 450 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="150"
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
                                        {`${event.location.street}, ${event.location.city}, ${event.location.state}, ${event.location.zipcode}`}
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
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Created By : {event.createdBy.firstName}{" "}
                                        {event.createdBy.lastName}
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
                </div>
            ))}
        </div>
    );
};

export default DisplayGoingEvents;
