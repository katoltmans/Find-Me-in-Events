import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

//Mui imports
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import io from "socket.io-client";
import '../App.css'


function DisplayAllEvent() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [eventList, setEventList] = useState([]);
  const navigate = useNavigate();
  const { state: user } = useLocation();
  const [socket] = useState(() => io(":8000"));

  console.log("user", user);
  // const [lat, setLat] = useState(0)
  // const [lng, setLng] = useState(0)
  // const [distance, setDistance] = useState('');
  // const [duration, setDuration] = useState('');
  // const [directionsResponse, setDirectionsResponse] = useState(null)

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      axios
        .get("http://localhost:8000/api/events", { withCredentials: true })
        .then((res) => {
          setEventList(res.data.events);
          console.log('all events', res.data.events);
          setIsLoaded(true);
        })
        .catch((err) => {
          console.log("error in front end DispalyALl", err);
        });
    }
  }, []);

  // useEffect(() => {
  //     const success = (pos) => {
  //         console.log('dispaly all pos',pos)
  //         setLat(pos.coords.latitude)
  //         setLng(pos.coords.longitude)
  //     }
  //     const err = (error) => {
  //         console.error(error)
  //     }
  //     navigator.geolocation.getCurrentPosition(success, err);

  // },[])

  // const center = { lat: lat, lng: lng };

  // async function calculateRoute( destination) {
  //     const address = destination.street + ", "+ destination.city + ', ' + destination.state
  //     console.log('from display all:',address)
  //     // eslint-disable-next-line no-undef
  //     const directionsService = new google.maps.DirectionsService()
  //     const results = await directionsService.route({
  //         origin: center,
  //         destination: destination,
  //      // eslint-disable-next-line no-undef
  //         travelMode: google.maps.TravelMode.DRIVING,
  //     })
  //     setDirectionsResponse(results)
  //     console.log(directionsResponse)

  //     const eventDistance = results.routes[0].legs[0].distance.text
  //     setDistance(results.routes[0].legs[0].distance.text)
  //     setDuration(results.routes[0].legs[0].duration.text)
  //     console.log(eventDistance, "distance")
  // }

  // how to fix date to numeric
const eventDate = (date) => {
    let fixDate = new Date(date);
    return fixDate.toLocaleDateString();
};


socket.on('newEvent', (data) => {
  axios
  .get("http://localhost:8000/api/events", { withCredentials: true })
  .then((res) => {
    setEventList(res.data.events);
    console.log('all events', res.data.events);
    setIsLoaded(true);
  })
})

socket.on('deleteEvent', () => {
    axios
    .get("http://localhost:8000/api/events", { withCredentials: true })
    .then((res) => {
        setEventList(res.data.events);
        setIsLoaded(true);
    })
})

const handlehover = (e, indx) => {
  let add = document.querySelectorAll('#ev')
  for(let i=0; i<add.length; i++){
    if(i == indx){
  add[i].className = 'hoverEffect'}

}
}

const out = (e) => {
let reset = document.querySelectorAll('#ev')
for(let i=0; i<reset.length; i++){
  reset[i].className=''
}
}



  return isLoaded ? (
    <div className="displayAll">
      <img
        className="image"
        src="https://images.unsplash.com/photo-1521356279905-e1d72a443574?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        alt="Input image here"
      />
      {eventList.map((event, i) => (
        <div key={event._id} className="displayAll"  >
          <Link className="link" to={`/events/${event._id}`}>
            <div id="ev" className="borderBox"  onMouseOver={(e) => {handlehover(e, i)}} onMouseOut = {(e) => {out(e)}} >
              <Card sx={{ maxWidth: 450 }}  >
                
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="150"
                    sx={{p:1}}
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
                      {eventDate(event.date)} - <span className="spn">Created by: {event.createdBy.firstName} {event.createdBy.lastName}</span>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.time}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                {/* <CardActions>
                  <Button size="small" color="primary">
                    <Link to={`/events/${event._id}`}> View Details</Link>
                  </Button>
                </CardActions> */}
              </Card>
            </div>
          </Link>
        </div>
      ))}
    </div>
  ) : (
    <div>Start by creating an Event </div>
  );
}

export default DisplayAllEvent;
