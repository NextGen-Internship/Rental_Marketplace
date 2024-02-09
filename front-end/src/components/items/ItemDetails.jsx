import React, { useState, useEffect } from "react";
import { fetchData } from "../fetchData";
import { useParams, useNavigate } from "react-router-dom";
import Carousel from "./carousel/Carousel";
import "./ItemDetails.css";
import { jwtDecode } from "jwt-decode";

const endpoint = "items/";

const ItemDetails = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  let userId = "";

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token !== null) {
      const decoded = jwtDecode(token);
      userId = decoded.jti;
    }

    const fetchItem = async () => {
      try {
        const result = await fetchData(endpoint + id);
        console.log(result);
        setItem(result);
      } catch (error) {
        navigate("/notfound");
      }
    };

    if (!item) {
      fetchItem();
    }

  }, [item, id, navigate]);

  return (
    <div className="item-details-container">
      {item && (
        <div className="item-details-content">
          <h1 className="item-name">{item.name}</h1>

          <Carousel className="carousel" />

          <div className="description-box">
            <h2>Description</h2>
            <p>
              {item.description}
            </p>
          </div>

          <div className="price-deposit-box">
            <h3>Price</h3>
            <p>{"$" + item.price}</p>
            <h3>Deposit</h3>
            <p>{"$" + item.deposit}</p>

            <button className="rent-button">Rent</button>
          </div>

          <div className="user-details">
            <h3>Posted on</h3>
            <p>
              {new Date(...item.postedDate).toLocaleString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
            <h3>Posted by</h3>
            <p>{item.user.firstName + " " + item.user.lastName}</p>
            <button className="message-button">Message</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;
