import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Logout = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem('accessToken'); 

    fetch(`${BASE_URL}/auth/logout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          navigate('/');
        } else {
          throw new Error('Failed to log out');  
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Logout failed. Please try again!');
      });
  };

  return (
    <button className='bg-red-500 rounded-md p-2' onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
