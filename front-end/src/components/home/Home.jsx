import React, { useState } from 'react';
import CategoriesList from '../categories/CategoriesList';
import SearchIcon from '@mui/icons-material/Search';
import ItemsList from '../items/ItemsList';
import './Home.css'

import ProfilePage from '../profile-page/ProfilePage';

import FilterComponent from '../filter/FilterComponent'; //  the FilterComponent


const Home = () => {


     const [items, setItems] = useState([]);
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const [filteredItems, setFilteredItems] = useState([]);

    



    return (
        <div className='home'>
            <CategoriesList />

    
            <ItemsList  />

        </div>
    );
};

export default Home;