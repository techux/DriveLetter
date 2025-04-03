import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const MyLetter = () => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("accessToken");

  const [letters, setLetters] = useState([]);

  useEffect(() => {
    fetchLetters();
  }, []);

  const fetchLetters = async () => {
    try {
      const response = await fetch(`${baseUrl}/letter/draft`, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch coupons");
      const data = await response.json();
      setLetters(data.letters);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <h2 className="text-4xl font-semibold text-center mt-5">My Letters</h2>

      <div className="max-w-4xl mx-auto mt-5 p-4 bg-slate-600 border-slate-500 border shadow-lg rounded-lg">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="bg-gray-700 rounded-lg text-center">
              <th className="px-2 py-2 font-semibold">S.No.</th>
              <th className="px-2 py-2 font-semibold">Filename</th>
              <th className="px-2 py-2 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {letters.map((letter, idx) => (
              <tr key={letter._id} className="text-center">
                <td className="px-2 py-2">{idx + 1}</td>
                <td className="px-2 py-2 max-w-[25rem] truncate">
                  {letter.filename}
                  {/* <div dangerouslySetInnerHTML={{ __html: letter.content }} /> */}
                </td>

                <td className="px-2 py-2 space-x-2">
                  <button className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none">
                    Open
                  </button>
                  <button className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyLetter;
