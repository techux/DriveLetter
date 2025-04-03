import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-blue-500 p-1 flex items-center justify-between">
        <div className="text-xl font-bold text-white bg-yellow-500 p-1 rounded-md">
          DriveLetter
        </div>

        <div className="flex gap-5 items-center mx-auto">
          <Link
            to={"/"}
            className="hover:text-gray-200 transition duration-200 text-white"
          >
            Dashboard
          </Link>
          <Link
            to={"/myletter"}
            className="hover:text-gray-200 transition duration-200 text-white"
          >
            My Letter
          </Link>
          <Logout />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
