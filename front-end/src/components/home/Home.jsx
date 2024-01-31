import React, { useState } from 'react';
import CategoriesList from '../categories/CategoriesList';
import SearchIcon from '@mui/icons-material/Search';
import ItemsList from '../items/ItemsList';
import './Home.css'
import FilterComponent from '../filter/FilterComponent'; //  the FilterComponent

const Home = () => {

    const [filteredItems, setFilteredItems] = useState([]);

    


    return (
        <div className='home'>
            <CategoriesList />

    
            <ItemsList  />

        </div>
    );
};

export default Home;
