import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/rentify-logo.svg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./Navbar.css";
import AuthContext from "../../contexts/AuthContext";

const Navbar = () => {
  const authContext = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} width={"200px"} alt="Logo" />
      </Link>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/items/create">Add Item</Link>
        { authContext.isLoggedIn ? (
          <>
            <Link to="/likes">
              <FavoriteBorderIcon />
            </Link>
            <Link to="/views">
              <VisibilityIcon />
            </Link>
            { authContext.picture ? (
              <Link to="/settings">
                <img
                  src={ authContext.picture}
                  alt="Profile"
                  className="profile-picture"
                />
              </Link>
            ) : (
              <Link to="/settings">
                <PersonIcon />
              </Link>
            )}
            <Link to="/" onClick={ authContext.logout }>
              <LogoutIcon />
            </Link>
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
};

export default Navbar;
