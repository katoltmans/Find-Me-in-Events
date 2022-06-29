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
import ForgotPassword from "./components/forgotPassword";
import Resetpassword from "./components/Resetpassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider } from "@emotion/react";
import { Box, createTheme, CssBaseline } from "@mui/material";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const theme = createTheme({
    palette: {
      background: {
        default: "#f2ebc5",
      },
      primary: {
        light: "#b455ff",
        main: "#7f1fd1",
        dark: "#49009f",
      },
      secondary: {
        light: "#97f7e6",
        main: "#64c4b4",
        dark: "2e9384",
      },
      text: {
        primary: "#004e9f",
      },
      text: {
        secondary: "#2e9384",
      },
      text: {
        disabled: "#b0ffff",
      },
      info: {
        main: "#46b5a6",
      },
      typography: {
        useNextVariants: true,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <BrowserRouter>
          <Box>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </Box>

          <Routes>
            <Route
              path="/login"
              element={<LoginRegistrationForm setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/" element={<WelcomePage />} />
            <Route path="/events" element={<DisplayAllEvent />} />
            <Route path="/new" element={<LaunchEvent />} />
            <Route path="/events/:id" element={<ViewEvent />} />
            <Route path="/myEvents" element={<MyEvent />} />
            <Route path="/event/edit/:id" element={<EditEvent />} />
            <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
            <Route
              path="/resetpassword/:token"
              element={<Resetpassword />}
            ></Route>
          </Routes>
          <ToastContainer autoClose={1000} position="top-center" />
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
