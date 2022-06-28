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

function MyEvent() {
  const { state: user } = useLocation();
  console.log("state", user);
  const [goingEvent, setGoingEvent] = useState([]);
  const [createdEvent, setCreatedEvent] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/getmyevents`, { withCredentials: true })
      .then((res) => {
        console.log("successfully fetched allmy events", res.data);
        const myallEvents = res.data;
        const createdEvent = myallEvents.filter((events) => {
          return events.createdBy._id == user._id;
        });
        setCreatedEvent(
          myallEvents.filter((event) => event.createdBy._id == user._id)
        );
        setGoingEvent(
          myallEvents.filter((event) => event.createdBy._id != user._id)
        );
      })
      .catch((err) => {
        console.log("Error while fetching the my events", err);
      });
  }, []);

  const eventDate = (date) => {
    let fixDate = new Date(date);
    return fixDate.toLocaleDateString();
  };

  const displayGoingEvents = (arr) => {
    console.log("goingevent", goingEvent);
    let eventsToshow = createdEvent;
    if (arr == "going") {
      eventsToshow = goingEvent;
    }
    return (
      <div className="displayAll">
        {eventsToshow.map((event) => (
          <div key={event._id} className="displayAll">
            <Card sx={{ maxWidth: 450 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={event.image}
                  alt={event.image}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {event.eventTitle}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`${event.location.street}, ${event.location.city}, ${event.location.state}, ${event.location.zipcode}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {eventDate(event.date)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.time}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Created By : {event.createdBy.firstName}{" "}
                    {event.createdBy.lastName}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  <Link to={`/events/${event._id}`}> View Details</Link>
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {!user ? (
        <h1> Please Login or register</h1>
      ) : (
        <>
          <div>
            <h1 className="myEvent">Going Events</h1>
            {displayGoingEvents("going")}
          </div>
          <hr />
          <hr />
          <h1 className="myEvent">Your Events</h1>
          <div>{displayGoingEvents("created")}</div>
        </>
      )}
    </div>
  );
}

export default MyEvent;
