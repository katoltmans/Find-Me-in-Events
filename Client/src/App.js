import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import "./App.css";
// Import components
import Navbar from "./components/Navbar";
import LoginRegistrationForm from "./components/LoginRegistrationForm";
import LunchEvent from "./components/LunchEvent";
import DispalyAllEvent from "./components/DisplayAllEvent"
import MyEvent from "./components/MyEvent"
import DisplayAllEvent from "./components/DisplayAllEvent";

function App() {
    // declare state
    const [events, setEvents] = useState([]);
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <BrowserRouter>
            <div>
                <Navbar user={user} setUser={setUser} isLoggedIn={isLoggedIn} />
                <Routes>
                    <Route
                        path="/register/login"
                        element={<LoginRegistrationForm />}
                    />
                    <Route path="/new" element= {<LunchEvent/>} />
                    <Route path="/" element= {<DisplayAllEvent isLoggedIn={isLoggedIn} />} />
                    <Route path="/events/:id" element= {<MyEvent/>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
