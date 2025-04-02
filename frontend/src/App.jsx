import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import MyLetter from "./components/MyLetter";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermOfService from "./components/TermOfService";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myletter" element={<MyLetter />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/termofservice" element={<TermOfService />} />
      </Routes>
    </Router>
  );
};

export default App;
