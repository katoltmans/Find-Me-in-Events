import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import LoginRegistrationForm from "./components/LoginRegistrationForm";
import HomePage from "./components/homePage";
import LaunchEvent from "./components/LaunchEvent";
import DispalyAllEvent from "./components/DisplayAllEvent";
import MyEvent from "./components/MyEvent";
import DisplayAllEvent from "./components/DisplayAllEvent";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <BrowserRouter>
            <div>
                <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <LoginRegistrationForm
                                setIsLoggedIn={setIsLoggedIn}
                            />
                        }
                    />
                    <Route path="/" element={<DisplayAllEvent />} />
                    <Route path="/new" element={<LaunchEvent />} />
                    <Route path="/events/:id" element={<MyEvent />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
