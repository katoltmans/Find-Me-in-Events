import axios from "axios";
import React, { useState } from "react";
import { Paper } from "@mui/material";
import { Typography, } from "@mui/material";
import { TextField } from "@mui/material";
import { Button, Box,Grid } from "@mui/material";


function ForgotPassword() {
  const [emailId, setemail] = useState("");

  function handleClick(e) {
    e.preventDefault();

    axios
      .put(
        "http://localhost:8000/api/forgotpassword",
        { emailId: emailId },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("succfully sent email", res);
        e.target.disabled = true;
      })
      .catch((err) => {
        console.log("Error while sending email", err);
      });
  }
  return (
    <div className="passwordBar">
      <Paper
            elevation={2}
            sx={{
              p: 3,
            }}
          >
            <Box>
              <Grid container spacing={3}>
                <Grid container item spacing={1}>
                  <Grid item xs={12}>
                  <h2>
                    ForgotPassword?
                  </h2>
                  <TextField
              fullWidth
              label="Enter your email"
              id="div"
              className="textField"
              value={emailId}
              onChange={(e) => {
              setemail(e.target.value)}}
            />
            <br/>
            <br/>
            <Typography>Reset Link has been sent your email</Typography>
            
            <Button  variant="contained"
              sx={{ mt: 3 , ml:3}} onClick={handleClick}>Go to emial</Button>
              </Grid>
                </Grid>
              </Grid>
            </Box>
      </Paper>
    </div>
  );
}

export default ForgotPassword;
