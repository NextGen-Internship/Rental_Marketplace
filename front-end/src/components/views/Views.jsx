import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData } from "../fetchData";
import { jwtDecode } from "jwt-decode";

const endpoint = "views/users/";

const Views = () => {
  const [items, setItems] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  let userId = '';

  useEffect(() => {
    const fetchViews = async () => {
      const googleToken = localStorage.getItem("google_token");
      const regularToken = localStorage.getItem("token");

      const token = googleToken !== null ? googleToken : regularToken;
      if (token !== null) {
        const decoded = jwtDecode(token);
        userId = decoded.jti;

        try {
          const result = await fetchData(endpoint + userId);
          setItems(result.map((i) => i.item));
        } catch (error) {
          console.log(error);
        }
      } else {
        navigate("/notfound");
      }
    };

    fetchViews();
  }, [userId, location]);

  return (
    <div className="items-list">
      {items.map((item, index) => (
        <div className="items-list-item" key={index}>
          <Link to={`/items/${item.id}`}>
            <h2>{item.name}</h2>
            <h5>{"$" + item.price}</h5>
            <p>{item.location}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Views;
