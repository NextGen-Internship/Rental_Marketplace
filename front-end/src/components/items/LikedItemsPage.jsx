import React, { useState, useEffect } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const LikedItemsPage = () => {
  const [likedItems, setLikedItems] = useState([]);

  

  useEffect(() => {
    const fetchLikedItemsFromDB = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          const decoded = jwtDecode(token);
          const userId = decoded.jti;

          const response = await fetch(`http://localhost:8080/rentify/favorite/userFavorite/${userId}`, {
            method: 'GET',
          });

          if (response.ok) {
            const likedItemsIds = await response.json();
            const detailedLikedItems = await Promise.all(likedItemsIds.map(async (itemId) => {
              const itemResponse = await fetch(`http://localhost:8080/rentify/items/${itemId}`, {
                method: 'GET',
              });
              if (itemResponse.ok) {
                return itemResponse.json();
              }
              throw new Error(`HTTP error! Status: ${itemResponse.status}`);
            }));
            setLikedItems(detailedLikedItems);
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }
      } catch (error) {
        console.error('Error fetching liked items:', error.message);
      }
    };

    fetchLikedItemsFromDB();
  }, []);
  
  const handleLikeClick = async (itemId) => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const userId = decoded.jti;
    console.log("handleLikeClick called for item:", itemId);

    const updatedLikedItems = likedItems.includes(itemId)
      ? likedItems.filter((id) => id !== itemId)
      : [...likedItems, itemId];

    

      setLikedItems((prevLikedItems) => {
        if (!isLiked) {
          return prevLikedItems.filter((item) => item.id !== itemId);
        } 
      });


  const isLiked = likedItems.includes(itemId);



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
        });
  
        console.log("isLike");
        console.log(JSON.stringify(requestBody));
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error in handleLikeClick:", error.message);
      }
      setLikedItems((prevLikedItems) => prevLikedItems.filter((id) => id !== itemId));

    };
    return (
        <div className="items-list">
          {likedItems.map((item) => (
            <div className="items-list-item" key={item.id}>
              <Link to={`/items/${item.id}`}>
                <h2>{item.name}</h2>
                <button
                  className={`like-button ${!likedItems.includes(item.id) ? 'clicked' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    try {
                      handleLikeClick(item.id);
                    } catch (error) {
                      console.error("Error in handleLikeClick:", error);
                    }
                  }}
                >
                  <FavoriteIcon />
                </button>
                <h5>{item.price}</h5>
                <p>{item.location}</p>
              </Link>
            </div>
          ))}
        </div>
      );
    }

    
    

export default LikedItemsPage;
