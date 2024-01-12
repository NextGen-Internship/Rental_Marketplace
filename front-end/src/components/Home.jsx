import React from 'react';
import CategoriesList from './categories/CategoriesList';
import SearchIcon from '@mui/icons-material/Search';
import ItemsList from './items/ItemsList';

const Home = () => {

    return (
        <div>
            
            <CategoriesList />

            <div className="search-container">
                <SearchIcon className="search-icon" />
                <input
                    type="text"
                    placeholder="Search by name..."
                // value={searchTerm}
                // onChange={handleSearchChange}
                />
            </div>

            <ItemsList />
        </div>
    );
};

export default Home;
