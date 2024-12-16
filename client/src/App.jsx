import React from "react";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Packages from "./components/Packages";
import Admin from "./components/AdminPanel/Admin";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/admin" element={<Admin />} />



        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
