import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./ItemsList.css";
import { fetchData } from "../fetchData";
import noImage from '../../assets/no-image.avif';

const endpointItems = "items";
const endpointPictires = "pictures/thumbnails";

const ItemsList = ({ searchTerm }) => {
  const endpointSuffix = useParams();
  const navigate = useNavigate();

  const [likedItems, setLikedItems] = useState(new Set());
  const [items, setItems] = useState([]);
  const [pictures, setPictures] = useState([]);

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

  // Create a mapping between item IDs and their respective pictures
  const itemPicturesMap = {};
  pictures.forEach((picture) => {
    itemPicturesMap[picture.item.id] = picture.url;
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

  return (
    <div className="items-list">
      {items &&
        pictures &&
        pictures.length > 0 &&
        filteredItems.map((item) => (
          <div className="items-list-item" key={item.id}>
            <Link to={`/items/${item.id}`}>
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
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ItemsList;
