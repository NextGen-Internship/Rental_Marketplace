import React, { useState } from 'react';
import CategoriesList from '../categories/CategoriesList';
import SearchIcon from '@mui/icons-material/Search';
import ItemsList from '../items/ItemsList';
import './Home.css'
import FilterComponent from '../filter/FilterComponent'; // Import the FilterComponent

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);

    
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (filteredItems) => {
        setFilteredItems(filteredItems);
    };

    return (
        <div className='home'>
            <CategoriesList />

            <div className="search-container">
                <SearchIcon className="search-icon" />
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            <FilterComponent onFilterChange={handleFilterChange} />
            <ItemsList searchTerm={filteredItems} />

        </div>
    );
};

export default Home;
