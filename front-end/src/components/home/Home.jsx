import React, { useState } from 'react';
import CategoriesList from '../categories/CategoriesList';
import SearchIcon from '@mui/icons-material/Search';
import ItemsList from '../items/ItemsList';
import './Home.css'

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
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

            <ItemsList searchTerm={searchTerm} />

        </div>
    );
};

export default Home;
