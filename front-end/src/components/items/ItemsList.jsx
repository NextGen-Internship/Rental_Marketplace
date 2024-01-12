// ItemsList.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './ItemsList.css';

const ItemsList = () => {
    const items = [
        { "id": 1, "name": "Item 1", "price": 20.99, "location": "City A" },
        { "id": 2, "name": "Item 2", "price": 15.49, "location": "City B" },
        { "id": 3, "name": "Item 3", "price": 30.00, "location": "City C" },
        { "id": 4, "name": "Item 4", "price": 25.99, "location": "City D" },
        { "id": 5, "name": "Item 5", "price": 12.99, "location": "City E" },
        { "id": 6, "name": "Item 6", "price": 18.75, "location": "City F" },
        { "id": 7, "name": "Item 7", "price": 22.50, "location": "City G" },
        { "id": 8, "name": "Item 8", "price": 19.95, "location": "City H" },
        { "id": 9, "name": "Item 9", "price": 35.99, "location": "City I" },
        { "id": 10, "name": "Item 10", "price": 28.00, "location": "City J" }
    ];

    const [likedItems, setLikedItems] = useState(new Set());

    const handleLikeClick = (itemId) => {
        // Toggle the liked state
        const updatedLikedItems = new Set(likedItems);
        if (likedItems.has(itemId)) {
            updatedLikedItems.delete(itemId);
        } else {
            updatedLikedItems.add(itemId);
        }
        setLikedItems(updatedLikedItems);
        // todo 
        // post request to add a like, or remove a like
    };

    return (
        <div className="items-list">
            {items.map((item) => (
                <div className="items-list-item" key={item.id}>
                    <Link to={`/items/${item.id}`}>
                        <h2>{item.name}</h2>
                        <button
                            className={`like-button ${likedItems.has(item.id) ? 'clicked' : ''}`}
                            onClick={(e) => {
                                e.preventDefault(); // Prevent the default link behavior
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
