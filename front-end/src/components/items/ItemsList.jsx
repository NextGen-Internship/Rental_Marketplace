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

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const handleLikeClick =  async (itemId) => {
        // Toggle the liked state
        const updatedLikedItems = new Set(likedItems);
        if (likedItems.has(itemId)) {
            updatedLikedItems.delete(itemId);
        } else {
            updatedLikedItems.add(itemId);
        }
        setLikedItems(updatedLikedItems);
        try {
            // Make a POST request to your Spring Boot backend
            const response = await fetch('http://localhost:8080/rentify/like', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_TOKEN_HERE', // Include the user's token
              },
              body: JSON.stringify({ itemId }),
            });
            if (!response.ok) {
                // If the server returns an error, revert the local state
                setLikedItems(new Set(likedItems));
                // Optionally, you can show an error message to the user
                console.error('Error recording like:', response.statusText);
              }
            } catch (error) {
              // Handle any network errors
              console.error('Network error:', error);
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
