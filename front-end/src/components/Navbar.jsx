import { Link } from "react-router-dom";
import logo from "../assets/rentify-logo.svg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} width={"200px"} />

      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create">Add Item</Link>
        <Link to="/Likes">
          {" "}
          <FavoriteBorderIcon />{" "}
        </Link>
        <Link to="/Settings">
          {" "}
          <PersonIcon />{" "}
        </Link>
        <Link to="/Logout">
          {" "}
          <LogoutIcon />{" "}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
