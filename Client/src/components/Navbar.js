import React from "react";
import { AppBar, Paper, Link, Button, Box } from "@mui/material";
import {
    Navigate,
    NavLink,
    Router,
    Routes,
    Link as RouterLink,
    useNavigate,
} from "react-router-dom";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Navbar = (props) => {
    const { user, setUser } = props;

    // const logoutHandler = () => {
    //     setUser({ logout: true });
    //     navigate("/");
    // };

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="static">
                <Toolbar disableGutters sx={{ ml: 2 }}>
                    <Typography
                        variant="h6"
                        color="inherit"
                        component="div"
                        sx={{ flexGrow: 5 }}
                    >
                        <Link
                            component={RouterLink}
                            to="/"
                            color="inherit"
                            underline="none"
                        >
                            <h1>Join In</h1>
                        </Link>
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexGrow: 1,
                            flexDirection: "flexEnd",
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
                                to="/"
                                color="inherit"
                                underline="none"
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
                                to="/"
                                color="inherit"
                                underline="none"
                            >
                                Launch An Event
                            </Link>
                        </Typography>
                        {!!user?.firstName ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    // justifyContent: "flex-end",
                                    ml: 5,
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
                                    // onClick={logoutHandler}
                                    sx={{ ml: 3 }}
                                >
                                    Logout
                                </Button>
                            </Box>
                        ) : (
                            <Box sx={{ flexDirection: "row-reverse", ml: 5 }}>
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
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
