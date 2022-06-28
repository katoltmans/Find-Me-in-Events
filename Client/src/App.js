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
                    <Route path="/welcome" element={<WelcomePage />} />
                    <Route path="/" element={<DisplayAllEvent />} />
                    <Route path="/new" element={<LaunchEvent />} />
                    <Route path="/events/:id" element={<ViewEvent />} />
                    <Route path="/event/:id" element={<MyEvent />} />
                    <Route path="/event/edit/:id" element={<EditEvent />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
