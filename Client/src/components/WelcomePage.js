import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Paper, Typography, Button, MobileStepper } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Link } from "react-router-dom";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const imageArray = [
    {
        label: "party scene",
        imgPath: "/image/pexels-joey-theswampboi-1486628.jpg",
    },
    {
        label: "wedding",
        imgPath: "/image/pexels-craig-adderley-2306281.jpg",
    },
    {
        label: "happy hour",
        imgPath: "/image/pexels-expect-best-1243337.jpg",
    },
    {
        label: "fireworks",
        imgPath: "/image/pexels-jonathan-petersson-399610.jpg",
    },
    {
        label: "baby shower",
        imgPath: "/image/pexels-fu-zhichao-587741.jpg",
    },

    {
        label: "evening out",
        imgPath: "image/pexels-salah-alawadhi-382297.jpg",
    },
    {
        label: "birthday",
        imgPath: "/image/pexels-ylanite-koppens-796606.jpg",
    },
];

// Photo Sources:
// Photo by Joey Theswampboi: https://www.pexels.com/photo/silhouette-of-crowd-people-1486628/
// Photo by Salah Alawadhi: https://www.pexels.com/photo/compound-lighted-with-string-lights-382297/
// Photo by fu zhichao: https://www.pexels.com/photo/various-desserts-on-a-table-covered-with-baby-blue-cover-587741/
// Photo by Craig Adderley: https://www.pexels.com/photo/tables-with-flower-decors-2306281/
// Photo by Ylanite Koppens: https://www.pexels.com/photo/colorful-balloons-with-confetti-796606/
// Photo by Expect Best: https://www.pexels.com/photo/wine-glasses-and-wine-bottles-on-top-of-brown-wooden-table-1243337/
// Photo by Jonathan Petersson: https://www.pexels.com/photo/fireworks-display-wallpaper-399610/

const WelcomePage = (props) => {
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = imageArray.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <Box
            sx={{
                maxWidth: 1000,
                flexGrow: 1,
                m: "auto",
            }}
        >
            <Paper
                square
                elevation={0}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 50,
                    pl: 2,
                    bgcolor: "background.default",
                    color: "text.secondary",
                    mt: 5,
                }}
            >
                {
                    <Typography
                        variant="h4"
                        sx={{
                            mb: 4,
                            color: "secondaryMain",
                            fontWeight: "bold",
                        }}
                    >
                        Login or register to
                        <span>
                            <Link
                                to="/login"
                                style={{
                                    textDecoration: "none",
                                    color: "#a120e2",
                                }}
                            >
                                {" "}
                                Join In
                            </Link>
                        </span>{" "}
                        on events!!
                    </Typography>
                }
            </Paper>
            <AutoPlaySwipeableViews
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {imageArray.map((step, index) => (
                    <div key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                component="img"
                                sx={{
                                    height: 660,
                                    display: "block",
                                    maxWidth: 1920,
                                    overflow: "hidden",
                                    width: "100%",
                                    borderRadius: "2%",
                                }}
                                src={step.imgPath}
                                alt={step.label}
                            />
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
                steps={imageArray.length}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === imageArray.length - 1}
                    >
                        Next
                        <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                    >
                        <KeyboardArrowLeft />
                        Back
                    </Button>
                }
            />
        </Box>
        // Source for base carousel code: https://mui.com/material-ui/react-stepper/#text-with-carousel-effect
    );
};

export default WelcomePage;
