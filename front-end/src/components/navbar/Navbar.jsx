import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/rentify-logo.svg';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import "./Navbar.css";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('google_token') !== null || localStorage.getItem('token') !== null ? true : false);

  useEffect(() => {
    const googleToken = localStorage.getItem('google_token');
    const regularToken = localStorage.getItem('token');

    if (googleToken !== null || regularToken !== null) {
      setIsLoggedIn(true);
    }

    const token = googleToken !== null ? googleToken : regularToken;
    if (token !== null) {
      const decoded = jwtDecode(token);

      setUserProfile({
        name: decoded.name,
        picture: decoded.picture,
      });
    }

  }, [location]);

  const handleLogout = () => {
    Object.keys(localStorage).forEach(key => { localStorage.removeItem(key); });
    setIsLoggedIn(false);
  };

  const [userProfile, setUserProfile] = useState({
    name: "",
    picture: "",
  });

  return (
    <nav className="navbar">
      <Link to="/"> <img src={logo} width={"200px"} alt="Logo" /> </Link>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create">Add Item</Link>
        {isLoggedIn ? (
          <>
            <Link to="/likes"> <FavoriteBorderIcon /> </Link>
            {userProfile.picture ? (
              <Link to="/settings">  <img
                src={userProfile.picture}
                alt="Profile"
                className="profile-picture"
              /> </Link>
            ) : (
              <Link to="/settings"> <PersonIcon /> </Link>
            )}
            <Link to="/" onClick={handleLogout}> <LogoutIcon /> </Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;