import { Link } from 'react-router-dom';
import logo from '../../assets/rentify-logo.svg'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; 
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar">
        <Link to="/"> <img src={logo} width={"200px"}/> </Link>

        <div className="links">
            <Link to="/">Home</Link>
            <Link to="/create">Add Item</Link>
            <Link to="/likes"> <FavoriteBorderIcon /> </Link>
            <Link to="/settings"> <PersonIcon /> </Link>
            <Link to="/logout"> <LogoutIcon /> </Link>
        </div>
    </nav> 
  )
}

export default Navbar;
