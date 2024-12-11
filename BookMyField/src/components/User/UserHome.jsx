// src/components/User/UserHome.jsx
import React from 'react';
import { Link } from 'react-router-dom';
 import './UserHome.css'; // Optional: Create a CSS file for styling
import Login from '../Auth/login';
const UserHome = () => {

  return (
    <div className="user-home">
      <h1>Welcome to User's Home Page</h1>
      <p>Here you can manage your booked turfs and access other features.</p>
      <Link to="/">
        <button>Book Now</button>
      </Link>
    </div>
  );

  
};

export default UserHome;