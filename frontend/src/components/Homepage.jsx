import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Button from "./Button";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.exp * 1000 < Date.now();
  } catch (error) {
    console.error(error);
    return true;
  }
};

const Homepage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken && !isTokenExpired(accessToken)) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLetterChange = (e) => {
    setLetter(e.target.value);
  };

  const handleSaveDraft = async () => {
    setMessage("");
    setError("");
    if (!letter.trim()) {
      toast.warn("Letter cannot be empty");
      setError("Letter cannot be empty.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setError("Authentication required.");
        setLoading(false);
        return;
      }

      const response = await fetch(`${BASE_URL}/letter/draft`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          content: letter,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Draft saved successfully!");
        setMessage("Draft saved successfully.");
        setLetter("");
      } else {
        toast.error(data.error || "Failed to save draft.");
        setError(data.error || "Failed to save draft.");
      }
    } catch (error) {
      toast.error("An error occurred while saving");
      setError("An error occurred while saving");
      // alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Link to={`${BASE_URL}/auth/google`}>
          <Button text="Login to save Letters" color="blue" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <nav className="bg-blue-500 p-4 text-white">Navbar</nav>

      <div className="container mx-auto p-4">
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Link to={"/"}>
              <Button text="Add New Letter" color="blue" />
            </Link>
            <Link to={"/myletter"}>
              <Button text="My Letters" color="slate" />
            </Link>
          </div>

          {/* Textarea */}
          <div className="mt-4">
            <textarea
              value={letter}
              onChange={handleLetterChange}
              className="w-full p-5 bg-slate-600 border-slate-500 border text-white rounded-md resize-none outline-none"
              placeholder="Draft your letter here..."
              rows={20}
            />
            <div className="flex justify-center gap-3 mt-5">
              <button
                className="px-4 py-2 rounded text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none"
                onClick={handleSaveDraft}
                disabled={loading}
              >
                Save to Draft
              </button>

              <button
                className="px-4 py-2 rounded text-white bg-green-500 hover:bg-green-600 focus:outline-none"
                onClick={handleSaveDraft}
              >
                Save
              </button>
            </div>
            {message && (
              <div className="flex justify-center">
                <p className="w-56 text-center text-green-500 mt-5 bg-green-100 py-2 px-4 rounded-md border border-green-500">
                  {message}
                </p>
              </div>
            )}
            {error && (
              <div className="flex justify-center">
                <p className="w-64 text-center text-red-500 mt-5 bg-red-100 py-2 px-4 rounded-md border border-red-500">
                  {error}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Homepage;
