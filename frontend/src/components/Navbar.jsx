import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-blue-500 p-4 text-white">
        DriveLetter
        <Link to={"/"}>Dashboard</Link>
      </nav>
    </div>
  );
};

export default Navbar;
