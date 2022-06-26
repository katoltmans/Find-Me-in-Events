import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Button,
    IconButton,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const EventComments = (props) => {
    const { comments, setComments, id, user } = props;
    const [comment, setComment] = useState("");

    const onSubmitComment = () => {
        axios
            .put(
                `http://localhost:8000/api/comment/${id}`,
                {
                    details: comment,
                },
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                console.log(res);
                console.log(comments);
                console.log("Comment: ", comment);
                setComments(res.data.comments);
                setComment("");
            })
            .catch((err) => {
                console.log("Error with EventController comments request", err);
            });
    };

    const deleteComment = (commentId) => {
        axios
            .delete(`http://localhost:8000/api/uncomment/${commentId}`, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);
                console.log(comments);
                setComments(comments.filter((c) => c._id !== commentId));
            })
            .catch((err) => {
                console.log("Error with delete request", err);
            });
    };

    return (
        <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                Comments
            </Typography>
            <ul>
                {comments.map((c) => {
                    return (
                        <li key={c._id}>
                            {c.details}
                            {c.postedBy._id === user._id ? (
                                <IconButton
                                    onClick={() => deleteComment(c._id)}
                                >
                                    <HighlightOffIcon
                                        sx={{ color: "#992e2e" }}
                                    />
                                </IconButton>
                            ) : null}
                        </li>
                    );
                })}
            </ul>
            <form>
                <TextField
                    fullWidth
                    label="Comments"
                    id="div"
                    className="textField"
                    value={comment}
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
