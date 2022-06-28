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

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <div>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
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
        </Routes>
        <ToastContainer autoClose={1000} position="top-center" />
      </div>
    </BrowserRouter>
  );
}

export default App;
