import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import "./App.css";
// Import components
import Navbar from "./components/Navbar";
import LoginRegistrationForm from "./components/LoginRegistrationForm";

function App() {
    // declare state
    const [events, setEvents] = useState([]);
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <BrowserRouter>
            <div>
                <Navbar user={user} setUser={setUser} isLoggedIn={isLoggedIn} />
                Hello World!
                <Routes>
                    <Route
                        path="/register/login"
                        element={<LoginRegistrationForm />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
