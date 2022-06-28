import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {useParams, Link} from "react-router-dom";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function MyEvent() {
    const [myEvent, setMyEvent]= useState("");

    useEffect(() => {
      axios.get(`http://localhost:8000/api/getmyevents`, {withCredentials:true})
      .then(res =>{
        setMyEvent(res.data.createdBy)
        console.log("EVENTITLE",res)
      }).catch (err =>{
        console.log ("MY EVENT ERROR",err)
      })
    }, [])
    


    const eventDate = (date) => {
        let fixDate = new Date(date);
        return fixDate.toLocaleDateString();
    };


    const displayMyEvent= ()=>{
        return(
            <div className="displayAll" >
                <Card sx={{ maxWidth: 345 }}>
        <CardMedia
        component="img"
        alt="Image"
        height="140"
        image=""
        />
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        eventTitle
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Street
        </Typography>
        <Typography variant="body2" color="text.secondary">
        City, State, Zipcode
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Date
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Time
        </Typography>
        <Typography variant="h6" color="text.secondary">
        Descriptions
        </Typography>
        <Typography variant="h6" color="text.secondary">
        Going/Maybe
        </Typography>
        </CardContent>
        <CardActions>
        <Button size="small">Like</Button>
        <Button size="small">Back to Details</Button>
        </CardActions>
    </Card>
            </div>
        )
    }



    const displayUserEvent= ()=>{
        return(
            <div className="displayAll" >
                <Card sx={{ maxWidth: 345 }}>
        <CardMedia
        component="img"
        alt="Image"
        height="140"
        image=""
        />
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        Createdby
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Street
        </Typography>
        <Typography variant="body2" color="text.secondary">
        City, State, Zipcode
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Date
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Time
        </Typography>
        <Typography variant="h6" color="text.secondary">
        Descriptions
        </Typography>
        <Typography variant="h6" color="text.secondary">
        Going/Maybe
        </Typography>
        </CardContent>
        <CardActions>
        <Button size="small">Like</Button>
        <Button size="small">Back to Details</Button>
        </CardActions>
    </Card>
            </div>
        )
    }


    return (
        <div>
            <form>
            {displayMyEvent()}
            </form>
            {displayUserEvent()}
        </div>
    )
}

export default MyEvent;