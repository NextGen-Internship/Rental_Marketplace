import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './ItemsList.css';
import { fetchData } from '../fetchData';


const endpoint = 'items';

const ItemsList = ({ searchTerm }) => {
    const endpointSuffix = useParams();

    const [likedItems, setLikedItems] = useState(new Set());
    const [items, setItems] = useState([]);
    const token = localStorage.getItem("token").trim();

    useEffect(() => {
        const fetchItems = async () => {
          try {

            const result = await fetchData(endpoint + (Object.keys(endpointSuffix).length === 0 ?  '' : '/category/' + endpointSuffix.id));
            setItems(result);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchItems();
      }, []);

   
      const handleLikeClick = async (itemId) => {
        console.log("handleLikeClick called for item:", itemId);
      
        const updatedLikedItems = new Set(likedItems);
        if (likedItems.has(itemId)) {
          updatedLikedItems.delete(itemId);
        } else {
          updatedLikedItems.add(itemId);
        }
      
      
        console.log("Token:", token);
      
        const isUnlike = !likedItems.has(itemId);
        setLikedItems(updatedLikedItems);
        const requestBody = {
          itemId: itemId,
          isUnlike: isUnlike,
      };

      // console.log("Triimmeed tokeey" + trimmedToken)
      
      // const urlEncodedToken = encodeURIComponent(trimmedToken);
        const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        };
        console.log("Token:", token);
      
        try {
          const response = await fetch("http://localhost:8080/rentify/favorite/liked", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(requestBody),
          });
      
          console.log("Like response:", response);
      
          if (!response.ok) {
            console.log("hvurlq li wee")
            throw new Error(`HTTP error! Status: ${response.status}`);
          } 
      
          const responseData = await response.json();
          console.log("Like response data:", responseData);
        } catch (error) {
          console.error("Error in handleLikeClick:", error.message);
        }
      };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes((searchTerm ?? '').toLowerCase())
    );

    return (
        <div className="items-list">
            {filteredItems.map((item) => (
                <div className="items-list-item" key={item.id}>
                    <Link to={`/items/${item.id}`}>
                        <h2>{item.name}</h2>
                        <button
                            className={`like-button ${likedItems.has(item.id) ? 'clicked' : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleLikeClick(item.id);
                            }}>
                            <FavoriteIcon />
                        </button>
                        <h5>{item.price}</h5>
                        <p>{item.location}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default ItemsList;
