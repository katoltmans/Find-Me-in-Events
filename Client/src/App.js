import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import LoginRegistrationForm from "./components/LoginRegistrationForm";
import LaunchEvent from "./components/LaunchEvent";
import DisplayAllEvent from "./components/DisplayAllEvent";
import MyEvent from "./components/MyEvent";
import EditEvent from "./components/EditEvent";
import ViewEvent from "./views/ViewEvent";
import WelcomePage from "./components/WelcomePage";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const theme = createTheme({
        palette: {
            background: {
                default: "#001159",
            },
            primary: {
                main: "#4d69bf",
            },
            secondary: {
                main: "#b0bec5",
            },
            text: {
                primary: "#3d3787",
            },
            text: {
                secondary: "#8197f2",
            },
            text: {
                disabled: "#8197f2",
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <BrowserRouter>
                    <div>
                        <Navbar
                            isLoggedIn={isLoggedIn}
                            setIsLoggedIn={setIsLoggedIn}
                        />
                        <Routes>
                            <Route
                                path="/login"
                                element={
                                    <LoginRegistrationForm
                                        setIsLoggedIn={setIsLoggedIn}
                                    />
                                }
                            />
                            <Route path="/" element={<WelcomePage />} />
                            <Route
                                path="/events"
                                element={<DisplayAllEvent />}
                            />
                            <Route path="/new" element={<LaunchEvent />} />
                            <Route path="/events/:id" element={<ViewEvent />} />
                            <Route path="/myEvents" element={<MyEvent />} />
                            <Route
                                path="/event/edit/:id"
                                element={<EditEvent />}
                            />
                        </Routes>
                        <ToastContainer autoClose={1000} />
                    </div>
                </BrowserRouter>
            </CssBaseline>
        </ThemeProvider>
    );
}

export default App;
