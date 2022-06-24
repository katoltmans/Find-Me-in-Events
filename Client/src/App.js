import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import LoginRegistrationForm from "./components/LoginRegistrationForm";
import HomePage from "./components/homePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route
            path="/"
            element={<LoginRegistrationForm setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
