import React, { useState, useEffect } from "react";
import axios from "axios";
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
                setComments(res.data.comments);
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
                console.log(res);
                setComments(comments.filter((c) => c._id !== commentId));
            })
            .catch((err) => {
                console.log("Error with delete request", err);
            });
    };

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
            <Box sx={{ overflowY: "auto", height: "200px", mt: 1 }}>
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
            </Box>
        </Paper>
    );
};

export default EventComments;
