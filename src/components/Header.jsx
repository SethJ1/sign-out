import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signOut, getCurrentUser } from '../Utils/firebase';
import './Header.css'; // Import the CSS file

const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    getCurrentUser().then((user) => {
      console.log("User object from Firebase:", user); // Log the user object
      if (user) {
        const displayName = user.email; // Get the user's display name
        if (displayName) {
          setCurrentUser(displayName); // Set the display name in the state
        } else {
          setCurrentUser('User'); // Use a default value if display name is not available
        }
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  return (
    <div className="header">
      <Link to="/home">Devlink Marketplace</Link>
      <div className="header-links">
        {currentUser ? (
          <>
            <span className="user-greeting">Welcome, {currentUser}</span>
            <button onClick={signOut}>Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/post-job">Find DEV</Link>
            <Link to="/job-list">Find Jobs</Link>
            <Link to="/">Login</Link>
            <Link to="/create-account">Create Account</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
