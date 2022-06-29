import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  Stack,
} from "@mui/material";
import { Container } from "@mui/system";

const LoginRegistrationForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [regErr, setRegErr] = useState([]);
  const [regErrorObj, setRegErrorObj] = useState({});
  const [logErr, setLogErr] = useState("");

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    confirmPassword: "",
  });

  const [loginuser, setloginUser] = useState({ emailId: "", password: "" });

  const onChangeHandler = (e, val) => {
    if (val == "register") {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    } else if (val == "login") {
      setloginUser({ ...loginuser, [e.target.name]: e.target.value });
    }
  };

  const OnSubmitHandlerRegistration = (e) => {
    console.log("submitting registration");
    e.preventDefault();
    console.log("USER: ", user);
    axios
      .post("http://localhost:8000/api/register", user, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("successfully registered", res.data);
        setIsLoggedIn(true);
        toast.success("Successfully Registered !!");
        navigate("/events", { state: res.data });
      })
      .catch((err) => {
        setLogErr("");
        setRegErr([]);
        setRegErrorObj(err.response.data.errors);
        console.log("Error with registering post request client", err);
        toast.warning("Please fill all the fields");
        const errorarray = (obj) => {
          const arr = [];
          for (let keys of Object.keys(obj)) {
            arr.push(obj[keys].message);
          }
          setRegErr(arr);
        };
        if (!err.response.data.errors && err.response.data.code == 11000) {
          setRegErr(["Email Should be unique"]);
          console.log("RegErr: ", regErr);
        } else {
          errorarray(err.response.data.errors);
        }
      });
  };

  const OnSubmitHandlerLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/login", loginuser, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("successfully loggedIn", res.data);
        setIsLoggedIn(true);
        toast.success("Successfully Logged in!!");
        navigate("/events", { state: res.data });
      })
      .catch((err) => {
        toast.error("Bad user credentials");
        setLogErr(err.response.data.Error);
        console.log("Error with login post request client", err);
        console.log("logErr: ", logErr);
      });
  };

  return (
    <Box sx={{ pt: 5, mx: 15 }}>
      <Grid container spacing={10}>
        <Grid item xs={6}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
            }}
          >
            <Typography variant="h3" component="h1" sx={{ fontSize: 25 }}>
              Registration
            </Typography>
            {regErr && (
              <List sx={{ mb: 5 }}>
                {regErr.map((error, index) => {
                  return (
                    <ListItem key={index} sx={{ color: "error.main" }}>
                      {error}
                    </ListItem>
                  );
                })}
              </List>
            )}
            <Box>
              <Grid container spacing={3}>
                <Grid container item spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="firstName"
                      label="First Name"
                      variant="outlined"
                      error={!!regErrorObj.firstName}
                      helperText={regErrorObj?.firstName?.message}
                      sx={{ mb: 2 }}
                      onChange={(e) => onChangeHandler(e, "register")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="lastName"
                      label="Last Name"
                      variant="outlined"
                      error={!!regErrorObj.lastName}
                      helperText={regErrorObj?.lastName?.message}
                      onChange={(e) => onChangeHandler(e, "register")}
                    />
                  </Grid>
                </Grid>
                <Grid container item spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="emailId"
                      label="Email"
                      variant="outlined"
                      error={!!regErrorObj.emailId}
                      helperText={regErrorObj?.emailId?.message}
                      onChange={(e) => onChangeHandler(e, "register")}
                    />
                  </Grid>
                </Grid>
                <Grid container item spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      error={!!regErrorObj.password}
                      helperText={regErrorObj?.password?.message}
                      onChange={(e) => onChangeHandler(e, "register")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="confirmPassword"
                      type="password"
                      label="Confirm Password"
                      variant="outlined"
                      error={!!regErrorObj.confirmPassword}
                      helperText={regErrorObj?.confirmPassword?.message}
                      onChange={(e) => onChangeHandler(e, "register")}
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
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{ fontSize: 25, mb: 7 }}
            >
              Login
            </Typography>
            {/* <List sx={{ mb: 5, color: "error.main" }}>
                            {logErr && <p>{logErr}!!</p>}
                        </List> */}
            <Box>
              <Grid container spacing={3}>
                <Grid container item spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="emailId"
                      label="Email"
                      variant="outlined"
                      error={!!logErr}
                      helperText={logErr}
                      onChange={(e) => onChangeHandler(e, "login")}
                    />
                  </Grid>
                </Grid>
                <Grid container item spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      error={!!logErr}
                      helperText={logErr}
                      onChange={(e) => onChangeHandler(e, "login")}
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
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginRegistrationForm;
