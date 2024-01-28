import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./ItemsList.css";
import { fetchData } from "../fetchData";
import noImage from "../../assets/no-image.avif";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const endpointItems = "items";
const endpointPictires = "pictures/thumbnails";

const ItemsList = ({ searchTerm }) => {
  const endpointSuffix = useParams();
  const navigate = useNavigate();

  const [likedItems, setLikedItems] = useState(new Set());
  const [items, setItems] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [userId, setUserId] = useState(null);


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const result = await fetchData(
          endpointItems +
            (Object.keys(endpointSuffix).length === 0
              ? ""
              : "/category/" + endpointSuffix.id)
        );
        setItems(result);
      } catch (error) {
        console.log(error);
      }
    };

    const handleLikeClick = async (itemId) => {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const userId = decoded.jti;
      console.log("handleLikeClick called for item:", itemId);

      const updatedLikedItems = new Set(likedItems);
      if (likedItems.has(itemId)) {
        updatedLikedItems.delete(itemId);
      } else {
        updatedLikedItems.add(itemId);
      }

      const isLiked = !likedItems.has(itemId);
      setLikedItems(updatedLikedItems);
      const requestBody = {
        itemId: itemId,
        userId: parseInt(userId, 10),
        isLiked: isLiked,
      };

      try {
        const response = await fetch(
          "http://localhost:8080/rentify/favorite/liked",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        console.log("isLike");
        console.log(JSON.stringify(requestBody));

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error in handleLikeClick:", error.message);
      }
    };

    const fetchPictures = async () => {
      try {
        const result = await fetchData(endpointPictires);
        setPictures(result);
      } catch (error) {
        navigate("/notfound");
      }
    };

    fetchItems();
    fetchPictures();
  }, []);

  const itemPicturesMap = {};
  pictures.forEach((picture) => {
    itemPicturesMap[picture.itemId] = picture.url;
  });

  const handleLikeClick = (itemId) => {
    const updatedLikedItems = new Set(likedItems);
    if (likedItems.has(itemId)) {
      updatedLikedItems.delete(itemId);
    } else {
      updatedLikedItems.add(itemId);
    }
    setLikedItems(updatedLikedItems);
    // TODO: Add logic for post request to add or remove a like
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes((searchTerm ?? "").toLowerCase())
  );

  useEffect(() => {
    const googleToken = localStorage.getItem("google_token");
      const regularToken = localStorage.getItem("token");

      const token = googleToken !== null ? googleToken : regularToken;
      if (token !== null) {
        const decoded = jwtDecode(token);
        setUserId(decoded.jti);
      }

      console.log(userId);
  }, []);

  const handleViewClick = (itemId) => {
    if (userId === null) {
      return;
    }
    
    const url = "http://localhost:8080/rentify/views";
    const postData = {
      user: { id: userId },
      item: { id: itemId },
    };

    axios
      .post(url, postData)
      .catch((error) => {
        console.error("Error making post request:", error);
      });
  };

  return (
    <div className="items-list">
      {items &&
        pictures &&
        pictures.length > 0 &&
        filteredItems.map((item) => (
          <div className="items-list-item" key={item.id}>
            <Link
              to={`/items/${item.id}`}
              onClick={() => handleViewClick(item.id)}
            >
              <div className="card">
                <img
                  src={itemPicturesMap[item.id] || noImage}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h3 className="card-title">{item.name}</h3>
                  <p className="card-text">{"$" + item.price}</p>
                  <p className="card-text">{item.address}</p>
                </div>
              </div>
            </Link>
            <button
              className={`like-button ${
                likedItems.has(item.id) ? "clicked" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleLikeClick(item.id);
              }}
            >
              <FavoriteIcon />
            </button>
          </div>
        ))}
    </div>
  );
};

export default ItemsList;
