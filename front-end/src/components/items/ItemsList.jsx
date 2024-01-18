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
