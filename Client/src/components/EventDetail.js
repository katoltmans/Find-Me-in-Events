import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import {
    Box,
    Grid,
    Paper,
    Typography,
    Button,
    MenuItem,
    Menu,
    IconButton,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuDropdown from "./MenuDropdown";

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        {...props}
    />
))(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === "light"
                ? "rgb(55, 65, 81)"
                : theme.palette.grey[300],
        boxShadow:
            "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        "& .MuiMenu-list": {
            padding: "4px 0",
        },
        "& .MuiMenuItem-root": {
            "& .MuiSvgIcon-root": {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                ),
            },
        },
    },
}));

const EventDetail = () => {
    const navigate = useNavigate();
    const [event, setEvent] = useState({});
    const { id } = useParams();
    console.log("ID:", id);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/events/${id}`)
            .then((res) => {
                console.log("EVENT: ", res.data);
                setEvent(res.data.event);
            })
            .catch((err) => {
                console.log("Error with getOneEvent request", err);
            });
    }, []);

    const handleDelete = () => {
        axios
            .delete(`http://localhost:8000/api/events/${id}`)
            .then((res) => {
                console.loh(res);
                // setEvents(events.filter((event) => event._id !== eventId));
                navigate("/");
            })
            .catch((err) => {
                console.log("Error with delete request", err);
            });
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    // Source: https://mui.com/material-ui/react-menu/

    const routeToUpdate = () => {
        navigate("/");
    };

    // Format date of event
    const eventDate = (date) => {
        let fixDate = new Date(date);
        return fixDate.toLocaleDateString();
    };

    return (
        <Paper elevation={2} sx={{ p: 10, m: 5 }}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Typography variant="h4" component="h2">
                        {event.eventTitle}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <IconButton
                        aria-label="more"
                        id="editMenuButton"
                        aria-controls={open ? "editMenu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleMenuClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <StyledMenu
                        id="editMenu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem
                            onClick={() => routeToUpdate(event._id)}
                            disableRipple
                        >
                            Edit
                        </MenuItem>
                        <MenuItem
                            onClick={() => handleDelete(event._id)}
                            disableRipple
                        >
                            Delete
                        </MenuItem>
                    </StyledMenu>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <img
                        src="/image/Meetup.png"
                        alt="placeholder"
                        width="100%"
                    />
                </Grid>
            </Grid>
            <Grid container item spacing={5} sx={{ display: "flex" }}>
                <Grid item xs={6}>
                    <Typography variant="h6" component="h2">
                        {event.location}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" component="h2">
                        {eventDate(event.date)} | {event.time}
                    </Typography>
                </Grid>
            </Grid>
            <Typography variant="body1" component="h2">
                {event.description}
            </Typography>

            <MenuDropdown
                dropdownButton={
                    <Button
                        variant="contained"
                        disableElevation
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        Update Status
                    </Button>
                }
            >
                <MenuItem
                    onClick={(e) => {
                        console.log("Going");
                    }}
                    disableRipple
                >
                    Going
                </MenuItem>
                <MenuItem
                    onClick={(e) => {
                        console.log("Maybe");
                    }}
                    disableRipple
                >
                    Maybe
                </MenuItem>
                <MenuItem
                    onClick={(e) => {
                        console.log("Can't Go");
                    }}
                    disableRipple
                >
                    Can't Go
                </MenuItem>
            </MenuDropdown>
        </Paper>
    );
};

export default EventDetail;
