import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { AppBar, Paper, Link, Button, Box, Stack } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import axios from "axios";
import GroupsIcon from "@mui/icons-material/Groups";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    console.log("props", isLoggedIn);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const userToken = Cookies.get("userToken");

    useEffect(() => {
        if (userToken) {
            const user = jwtDecode(userToken);
            // console.log("user", user);
            setUser(user);
        }
    }, [isLoggedIn]);

    const handleLogout = () => {
        axios
            .post(
                "http://localhost:8000/api/logout",
                {},
                { withCredentials: true }
            )
            .then((response) => {
                // console.log("succfully logged out", response.data);
                setUser(null);
                setIsLoggedIn(false);
                toast.success("Successfully LoggedOut !!");
                navigate("/");
            })
            .catch((err) => {
                console.log("error while logging out", err);
            });
    };

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="static">
                <Toolbar disableGutters sx={{ ml: 2 }}>
                    <GroupsIcon sx={{ fontSize: "60px" }} />
                    <Typography
                        variant="h6"
                        color="inherit"
                        component="div"
                        sx={{ flexGrow: 4, ml: 2 }}
                    >
                        <Link
                            component={RouterLink}
                            to="/events"
                            color="inherit"
                            underline="none"
                            state={user}
                        >
                            <h1>Join In</h1>
                        </Link>
                    </Typography>

                    <Stack
                        direction="row"
                        alignItems="end"
                        sx={{
                            display: "flex",
                            flexGrow: 1,
                        }}
                    >
                        <Typography
                            variant="h6"
                            color="inherit"
                            component="div"
                            sx={{ mr: 8 }}
                        >
                            <Link
                                component={RouterLink}
                                to="/myEvents"
                                color="inherit"
                                underline="none"
                                state={user}
                            >
                                My Events
                            </Link>
                        </Typography>
                        <Typography
                            variant="h6"
                            color="inherit"
                            component="div"
                            sx={{ mr: 8 }}
                        >
                            <Link
                                component={RouterLink}
                                to="/new"
                                color="inherit"
                                underline="none"
                                state={user}
                            >
                                Launch An Event
                            </Link>
                        </Typography>
                        {!!user?.firstName ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    ml: 5,
                                    flexGrow: 1,
                                }}
                            >
                                <Typography
                                    sx={{
                                        pt: 1,
                                        fontSize: 30,
                                        fontWeight: "bold",
                                    }}
                                >
                                    Welcome {user.firstName}
                                </Typography>
                                <Button
                                    variant="contained"
                                    onClick={handleLogout}
                                    sx={{ ml: 3 }}
                                >
                                    Logout
                                </Button>
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    flexDirection: "row-reverse",
                                    ml: 5,
                                    flexGrow: 1,
                                }}
                            >
                                <Button variant="contained">
                                    <Link
                                        component={RouterLink}
                                        to="/login"
                                        color="inherit"
                                        underline="none"
                                    >
                                        Login or Register
                                    </Link>
                                </Button>
                            </Box>
                        )}
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
