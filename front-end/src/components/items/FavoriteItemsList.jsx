import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import './FavoriteItemList.css'; // You may need to create a separate CSS file
import { fetchData } from '../fetchData';
import { jwtDecode } from 'jwt-decode';

const FavoriteItemsList = () => {
  const [likedItems, setLikedItems] = useState([]);

  useEffect(() => {
    const fetchLikedItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        const userId = decoded.jti;

        // Fetch liked items for the user from the backend
        const likedItemsResponse = await fetchData(`http://localhost:8080/rentify/favorite/liked/${userId}`);
        setLikedItems(likedItemsResponse);
      } catch (error) {
        console.error('Error fetching liked items:', error);
      }
    };

    fetchLikedItems();
  }, []);

  return (
    <Box className="favorite-items-list">
      <h2>Your Liked Items</h2>
      {likedItems.length === 0 ? (
        <p>No liked items yet.</p>
      ) : (
        <Box display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
          {likedItems.map((item) => (
            <Box key={item.id} className="items-list-item" border={1} p={2}>
              <Link to={`/items/${item.id}`}>
                <h2>{item.name}</h2>
                <h5>{item.price}</h5>
                <p>{item.location}</p>
              </Link>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default FavoriteItemsList;
