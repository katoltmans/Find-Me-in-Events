import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import {
    AppBar,
    Link,
    Button,
    Box,
    Menu,
    MenuItem,
    IconButton,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import axios from "axios";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuIcon from "@mui/icons-material/Menu";
import { Container } from "@mui/system";

const pages = [
    { title: "My Events", link: "/myEvents" },
    { title: "Launch An Event", link: "/new" },
];

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const userToken = Cookies.get("userToken");
    const [anchorElNav, setAnchorElNav] = useState(null);

    //Style of nav links
    const styles = {
        color: "#fff",
        "&:hover": {
            color: "#300166",
        },
        verticalAlign: "baseline",
    };

    //Style of menu items
    const menuStyles = {
        color: "#000",
        "&:hover": {
            color: "#7f1fd1",
        },
    };

    useEffect(() => {
        if (userToken) {
            const user = jwtDecode(userToken);
            // console.log("user", user);
            setUser(user);
        }
    }, [isLoggedIn, userToken]);

    const handleLogout = () => {
        axios
            .post(
                "http://localhost:8000/api/logout",
                {},
                { withCredentials: true }
            )
            .then((response) => {
                // console.log("successfully logged out", response.data);
                setUser(null);
                setIsLoggedIn(false);
                toast.success("Successfully LoggedOut !!");
                navigate("/");
            })
            .catch((err) => {
                console.log("error while logging out", err);
            });
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        sx={{
                            display: { xs: "none", md: "flex" },
                            ml: 5,
                            alignItems: "center",
                        }}
                    >
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
                                sx={styles}
                            >
                                <h1>Join In</h1>
                            </Link>
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page, index) => (
                                <MenuItem
                                    key={index}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography
                                        variant="h6"
                                        color="inherit"
                                        sx={{ ml: 5 }}
                                    >
                                        <Link
                                            component={RouterLink}
                                            to={page.link}
                                            underline="none"
                                            sx={menuStyles}
                                            state={user}
                                        >
                                            {page.title}
                                        </Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                            {!!isLoggedIn ? (
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Button
                                        variant="contained"
                                        onClick={handleLogout}
                                        sx={{ ml: 3 }}
                                    >
                                        Logout
                                    </Button>
                                </MenuItem>
                            ) : (
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Button variant="contained">
                                        <Link
                                            component={RouterLink}
                                            to="/login"
                                            color="inherit"
                                            underline="none"
                                            state={user}
                                        >
                                            Login or Register
                                        </Link>
                                    </Button>
                                </MenuItem>
                            )}
                        </Menu>
                        <Box
                            sx={{
                                display: { xs: "flex", md: "none" },
                                ml: 5,
                                alignItems: "center",
                            }}
                        >
                            <GroupsIcon sx={{ fontSize: "35px" }} />
                            <Typography
                                variant="body1"
                                noWrap
                                color="inherit"
                                component="h1"
                                sx={{ flexGrow: 4, ml: 2 }}
                            >
                                <Link
                                    component={RouterLink}
                                    to="/events"
                                    color="inherit"
                                    underline="none"
                                    state={user}
                                    sx={styles}
                                >
                                    <h1>Join In</h1>
                                </Link>
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: {
                                xs: "none",
                                md: "flex",
                            },
                            justifyContent: "flex-end",
                            verticalAlign: "text-bottom",
                            flexGrow: 2,
                        }}
                    >
                        {pages.map((page, index) => {
                            return (
                                <Typography
                                    variant="h6"
                                    color="#fff"
                                    key={index}
                                    sx={{ mx: 2 }}
                                >
                                    <Link
                                        to={page.link}
                                        component={RouterLink}
                                        color="inherit"
                                        underline="none"
                                        sx={styles}
                                        state={user}
                                    >
                                        {page.title}
                                    </Link>
                                </Typography>
                            );
                        })}
                    </Box>

                    {!!isLoggedIn && !!user?.firstName ? (
                        <Box
                            sx={{
                                display: { xs: "none", md: "flex" },
                                justifyContent: "flex-end",
                                ml: 5,
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    fontSize: "25px",
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
                                display: { xs: "none", md: "flex" },
                                ml: 5,
                            }}
                        >
                            <Button variant="contained">
                                <Link
                                    component={RouterLink}
                                    to="/login"
                                    color="inherit"
                                    underline="none"
                                    state={user}
                                >
                                    Login or Register
                                </Link>
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
