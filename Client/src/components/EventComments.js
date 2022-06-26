import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Paper, TextField, Typography } from "@mui/material";

const EventComments = () => {
    const [attendees, setAttendees] = useState([]);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    const onSubmitComment = () => {
        console.log(comment);
    };

    return (
        <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                Comments
            </Typography>
            <ul>
                <li>Will Set Map Function</li>
                <li>Once I Have</li>
                <li>Axios Route</li>
            </ul>
            <form>
                <TextField
                    fullWidth
                    label="Comments"
                    id="div"
                    className="textField"
                    // value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={onSubmitComment}
                >
                    Submit
                </Button>
            </form>
        </Paper>
    );
};

export default EventComments;
