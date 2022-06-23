import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Grid,
    Paper,
    TextField,
    Typography,
    Button,
    ListItem,
    List,
} from "@mui/material";

const LoginRegistrationForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
    });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const onChangeHandler = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const OnSubmitHandlerRegistration = (e) => {
        console.log("submitting registration");
        e.preventDefault();

        console.log("USER: ", user);
        // Post request to create a new author
        axios
            .post("http://localhost:8000/api/register", user)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                if (!res.data?.errors) {
                    //set user if successfully registered
                    setUser(user);
                    navigate("/");
                } else {
                    // Add errors to be d
                    setErrors(res.data.errors);
                }
            })
            .catch((err) => {
                console.log(
                    "Error with post registration request (client)",
                    err
                );
                setErrors(err.response.data?.error?.errors);
                console.log("ERROR:", errors);
            });
    };

    const OnSubmitHandlerLogin = (e) => {
        console.log("submitting login");
        e.preventDefault();

        console.log("USER: ", user);

        // Post request to create a new author
        axios
            .post("http://localhost:8000/api/login")
            // {
            //     email: email,
            //     password: password,
            // }
            .then((res) => {
                console.log(res);
                console.log(res.data);
                if (!res.data.errors) {
                    //setIsLoggedIn
                    setUser(res.data.user);
                    navigate("/hacks/view");
                } else {
                    setErrors(res.data.errors);
                }
            })
            .catch((err) => {
                console.log("Error with login post request (client)", err);
            });
    };

    return (
        <Paper elevation={2} sx={{ p: 5, m: 5, display: "flex" }}>
            <Box sx={{ flexGrow: 1, mr: 1 }}>
                <Typography variant="h3" component="h1" sx={{ mb: 3 }}>
                    Registration
                </Typography>
                {errors ? (
                    <List sx={{ mb: 5 }}>
                        {errors.map((error, index) => {
                            return (
                                <ListItem
                                    key={index}
                                    sx={{ color: "error.main" }}
                                >
                                    {error}
                                </ListItem>
                            );
                        })}
                    </List>
                ) : null}
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={3}>
                        <Grid container item spacing={1}>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    name="first_name"
                                    label="First Name"
                                    variant="outlined"
                                    onChange={onChangeHandler}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    name="last_name"
                                    label="Last Name"
                                    variant="outlined"
                                    onChange={onChangeHandler}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item spacing={3}>
                            <Grid item xs={8}>
                                <TextField
                                    fullWidth
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    onChange={onChangeHandler}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item spacing={3}>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    name="password"
                                    type="password"
                                    label="Password"
                                    variant="outlined"
                                    onChange={onChangeHandler}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    name="confirm_password"
                                    type="password"
                                    label="Confirm Password"
                                    variant="outlined"
                                    onChange={onChangeHandler}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        sx={{ mt: 3 }}
                        onClick={OnSubmitHandlerRegistration}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
            <Box sx={{ flexGrow: 1, ml: 5 }}>
                <Typography variant="h3" component="h1" sx={{ mb: 3 }}>
                    Login
                </Typography>
                {errors ? (
                    <Typography sx={{ color: "error.main", mb: 5 }}>
                        {errors}
                    </Typography>
                ) : null}
                {/* {errors ? (errors.map((errorMessage, index) => {
                <>
                <Typography sx={{ color: "error.main", mb: 5 }}>
                    {errors}
                </Typography>
                <Divider/>
                </>
            }) : null} */}
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={3}>
                        <Grid container item spacing={3}>
                            <Grid item xs={8}>
                                <TextField
                                    fullWidth
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item spacing={3}>
                            <Grid item xs={8}>
                                <TextField
                                    fullWidth
                                    name="password"
                                    type="password"
                                    label="Password"
                                    variant="outlined"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        sx={{ mt: 3 }}
                        onClick={OnSubmitHandlerLogin}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default LoginRegistrationForm;
