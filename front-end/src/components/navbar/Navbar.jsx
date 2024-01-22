import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import logo from '../../assets/rentify-logo.svg';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import "./Navbar.css";

const Navbar = ({ isLoggedIn, setIsLoggedIn, onLogin, onLogout }) => {
  useEffect(() => {
    const googleToken = localStorage.getItem('google_token');
    setIsLoggedIn(!!googleToken);
  }, [isLoggedIn]);

  const handleLogout = () => {
    Object.keys(localStorage).forEach(key => { localStorage.removeItem(key); });
    setIsLoggedIn(false);
    onLogout();
  };

  return (
    <nav className="navbar">
      <Link to="/"> <img src={logo} width={"200px"} /> </Link>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create">Add Item</Link>
        {isLoggedIn ? (
          <>
            <Link to="/likes"> <FavoriteBorderIcon /> </Link>
            <Link to="/settings"> <PersonIcon /> </Link>
            <Link to="/" onClick={handleLogout}> <LogoutIcon /> </Link>
          </>
        ) : (
          <>
            <Link to="/login" onClick={onLogin}>Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
