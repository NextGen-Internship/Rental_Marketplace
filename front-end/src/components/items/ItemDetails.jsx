import React, { useState, useEffect } from "react";
import { fetchData } from "../fetchData";
import { useParams, useNavigate } from "react-router-dom";
import Carousel from "./carousel/Carousel";
import "./ItemDetails.css";

const endpoint = "items/";

const ItemDetails = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
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
              {item.description +
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"}
            </p>
          </div>
          
          
          <div className="price-deposit-box">
            <div className="price-deposit">
              <h3>Price</h3>
              <p>{"$" + item.price}</p>
              <h3>Deposit</h3>
              <p>{"$" + item.deposit}</p>
            </div>

            <div className="item-buttons">
              <button className="rent-button">Rent</button>
              <button className="message">Message</button>
            </div>
          </div>

          {/* todo edin flex box- podredi v 1 red s koloni:
          price/ deposit, rent
          user name + click on profile + message
          category, posted date 
          
          when click on profile -> load a page with all items of this user*/}
        </div>
      )
      }
    </div>
  );
};

export default ItemDetails;
