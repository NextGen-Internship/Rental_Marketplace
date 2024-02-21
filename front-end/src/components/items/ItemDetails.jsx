import React, { useState, useEffect } from "react";
import { fetchData } from "../fetchData";
import { useParams, useNavigate, Link } from "react-router-dom";
import Carousel from "./carousel/Carousel";
import "./ItemDetails.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

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

    if (item && !item.isActive && item.user.id != userId) {
      navigate("/notfound");
    }
  }, [item, id, navigate]);



  // const rentItem = async () => {
  //   try {
  //   const response = await axios.post(`http://localhost:8080/rentify/stripe/checkout/${id}`,userId)
  //   window.open(response.data);
  //   } catch (e){
  //     console.log(e);
  //   }
  // }


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
              <br />
              {
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
              }
            </p>
          </div>

          <div className="price-deposit-box">
            <h3>Price</h3>
            <p>{"$" + item.price}</p>
            <h3>Deposit</h3>
            <p>{"$" + item.deposit}</p>

            <Link to={`/rent-item/${item.id}`}>
              <button className="rent-button">Rent</button>
            </Link>
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
            {/* <button className="message-button">Message</button> */}
            <h3>Address</h3>
            <p>{item.address.city}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;
