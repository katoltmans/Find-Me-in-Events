import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import "./App.css";
// Import components
import Navbar from "./components/Navbar";

function App() {
    // declare state
    const [events, setEvents] = useState([]);
    const [user, setUser] = useState({});

    return (
        <BrowserRouter>
            <div>
                <Navbar user={user} setUser={setUser} />
                Hello World!
                <Routes></Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
