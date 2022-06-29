import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import ReactScrollableFeed from "react-scrollable-feed";
import {
    Button,
    Grid,
    IconButton,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Box } from "@mui/system";

const EventComments = (props) => {
    const { comments, setComments, id, user } = props;
    const [comment, setComment] = useState("");
    const [socket] = useState(() => io(":8000"));

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
                setComments(res.data.comments);
                socket.emit("newComment", res.data.comments);
                setComment("");
            })
            .catch((err) => {
                console.log("Error with EventController comments request", err);
            });
    };
    console.log("comments", comments);
    const deleteComment = (commentId) => {
        axios
            .put(
                `http://localhost:8000/api/uncomment/${commentId}`,
                {
                    eventId: id,
                },
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                // console.log('delete res',res);
                socket.emit("delete", commentId);
                setComments(comments.filter((c) => c._id !== commentId));
            })
            .catch((err) => {
                console.log("Error with delete request", err);
            });
    };

    socket.on("delete", (data) => {
        // console.log('socket data', data)
        setComments(comments.filter((c) => c._id !== data));
    });

    return (
        <Paper elevation={2} sx={{ p: 3, height: "348px" }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                Comments
            </Typography>
            <form>
                <TextField
                    fullWidth
                    label="Comments"
                    id="div"
                    className="textField"
                    value={comment}
                    size="small"
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button
                    variant="contained"
                    sx={{ mt: 1 }}
                    onClick={onSubmitComment}
                >
                    Submit
                </Button>
            </form>
            <Box sx={{ overflowY: "auto", height: "170px", mt: 1 }}>
                <ReactScrollableFeed>
                    <ul>
                        {comments.map((c) => {
                            return (
                                <li key={c._id}>
                                    <Grid container>
                                        <Grid item xs={11}>
                                            <Typography
                                                variant="h5"
                                                component="h2"
                                                sx={{
                                                    fontSize: 15,
                                                    fontWeight: "bold",
                                                    mt: 1,
                                                }}
                                            >
                                                {c.postedBy.firstName +
                                                    " " +
                                                    c.postedBy.lastName}
                                            </Typography>
                                        </Grid>
                                        {c.postedBy._id === user._id ? (
                                            <Grid item xs={1}>
                                                <IconButton
                                                    onClick={() =>
                                                        deleteComment(c._id)
                                                    }
                                                >
                                                    <HighlightOffIcon
                                                        sx={{
                                                            color: "#992e2e",
                                                            fontSize: 20,
                                                            fontWeight: "bold",
                                                            m: -8,
                                                        }}
                                                    />
                                                </IconButton>
                                            </Grid>
                                        ) : null}
                                    </Grid>
                                    {c.details}
                                </li>
                            );
                        })}
                    </ul>
                </ReactScrollableFeed>
            </Box>
        </Paper>
    );
};

export default EventComments;
