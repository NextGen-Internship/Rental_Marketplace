import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/rentify-logo.svg';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "./Navbar.css";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';


const Navbar = () => {
  const location = useLocation();

  const [userProfile, setUserProfile] = useState({

    name: '',
    picture: '',
  })

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null ? true : false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token !== null) {
      setIsLoggedIn(true);
      const decoded = jwtDecode(token);
      const userId = decoded.jti;
      const fetchUserInfo = async () => {


        try {
          const response = await axios.get(`http://localhost:8080/rentify/users/${userId}`);


          setUserProfile({
            name: response.data.name,
            picture: response.data.profilePicture,
          });

        }
        catch (error) {
          console.error("Error fetching user Info ", error);
        }

      };

      fetchUserInfo();
    }
    
  }, [location , userProfile.picture]);



  const handleLogout = () => {
    Object.keys(localStorage).forEach(key => { localStorage.removeItem(key); });
    setIsLoggedIn(false);

  };


  return (
    <nav className="navbar">
      <Link to="/"> <img src={logo} width={"200px"} alt="Logo" /> </Link>
      <div className="links">
        <Link to="/">Home</Link>
       
        {isLoggedIn ? (
          <>

<Link to="/items/create">Add Item</Link>
            <Link to="/likes"> <FavoriteBorderIcon /> </Link>
            <Link to="/views"><VisibilityIcon /> </Link>
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