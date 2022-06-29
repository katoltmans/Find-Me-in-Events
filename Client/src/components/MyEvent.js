import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import "../App.css";
import DisplayGoingEvents from "./DisplayGoingEvents";

function MyEvent() {
    const [goingEvent, setGoingEvent] = useState([]);
    const [createdEvent, setCreatedEvent] = useState([]);
    const { state: user } = useLocation();
    console.log("state", user);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/getmyevents`, {
                withCredentials: true,
            })
            .then((res) => {
                // console.log("successfully fetched all my events", res.data);
                const myallEvents = res.data;
                const createdEvent = myallEvents.filter((events) => {
                    return events.createdBy._id == user._id;
                });
                setCreatedEvent(
                    myallEvents.filter(
                        (event) => event.createdBy._id == user._id
                    )
                );
                setGoingEvent(
                    myallEvents.filter(
                        (event) => event.createdBy._id != user._id
                    )
                );
            })
            .catch((err) => {
                console.log("Error while fetching the my events", err);
            });
    }, []);

    return (
        <div>
            
            {!user ? (
                <h1> Please Login or register</h1>
            ) : (
                <>
                    <div className="myEventBox">
                        <h1 className="myEvents">Going Events</h1>
                        <DisplayGoingEvents
                            eventsToshow={goingEvent}
                            sectionId="goingEvents"
                        />
                    </div>
                    <div className="myEventBox">
                        <h1 className="myEvents">Your Events</h1>
                        <DisplayGoingEvents
                            eventsToshow={createdEvent}
                            sectionId="yourEvents"
                        />
                    </div>
                    
                </>
            )}
            
        </div>
    );
}

export default MyEvent;
