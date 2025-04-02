import React from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import Logout from "./Logout";

const Dashboard = () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/" replace={true} />;
  }
  const user = jwtDecode(token);
  try {
    const currentTime = Date.now() / 1000;

    if (user.exp && user.exp < currentTime) {
      localStorage.removeItem("accessToken");
      return <Navigate to="/" replace={true} />;
    }
  } catch (err) {
    console.log("Error in decoding token : " + err);
    localStorage.removeItem("accessToken");
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}!</p> <br></br>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>UserID: {user.id}</p>


      <Logout />

    

    </div>
  );
};

export default Dashboard;
