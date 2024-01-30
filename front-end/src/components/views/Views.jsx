import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData } from "../fetchData";
//import { jwtDecode } from "jwt-decode";
import noImage from "../../assets/no-image.avif";
import AuthContext from "../../contexts/AuthContext";

const endpoint = "views/users/";

const Views = () => {
  const [items, setItems] = useState([]);
  //const location = useLocation();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  //let userId = '';

  useEffect(() => {
    const fetchViews = async () => {
      //const token = localStorage.getItem("token");

      console.log("aa" + authContext.isLoggedIn)
      if (authContext.isLoggedIn) {
        // const decoded = jwtDecode(token);
        // userId = decoded.jti;

        try {
          const result = await fetchData(endpoint + authContext.userId);
          setItems(result.map((i) => i.item));
        } catch (error) {
          console.log(error);
        }
      } else {
        navigate("/notfound");
      }
    };

    authContext.login()
    fetchViews();
  }, []);

  return (
    <div className="items-list">
      {items.map((item, index) => (
        <div className="items-list-item" key={index}>
          <Link to={`/items/${item.id}`}>
          <div className="card">
                <img
                  src={item.thumbnail || noImage}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h3 className="card-title">{item.name}</h3>
                  <p className="card-text">{"$" + item.price}</p>
                  <p className="card-text">{item.address}</p>
                </div>
              </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Views;
