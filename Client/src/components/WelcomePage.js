import React from "react";
import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

const WelcomePage = () => {
    return (
        <Box sx={{ height: "100%", alignItems: "center", mt: 4, mx: "auto" }}>
            <Typography variant="h3" component="h1" sx={{ fontSize: 25 }}>
                Login or register to join the party!
            </Typography>
            <img
                src="/image/pexels-joey-theswampboi-1486628.jpg"
                alt="Join the party"
            />
        </Box>
    );
};

export default WelcomePage;
