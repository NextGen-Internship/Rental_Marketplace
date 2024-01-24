import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './ItemsList.css';
import { fetchData } from '../fetchData';
import { jwtDecode } from "jwt-decode";

const endpoint = 'items';



const ItemsList = ({ searchTerm }) => {
    const endpointSuffix = useParams();
    const [items, setItems] = useState([]);


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
      const [likedItems, setLikedItems] = useState(new Set());
   
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
          isLiked: isLiked
      };
    
        try {
          const response = await fetch("http://localhost:8080/rentify/favorite/liked", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
          },
            body: JSON.stringify(requestBody)
          })

          console.log("isLike")
          console.log(JSON.stringify(requestBody));
          
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          } 
      
  
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
