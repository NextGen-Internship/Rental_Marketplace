import React from 'react';
import CategoriesList from './categories/CategoriesList';
import SearchIcon from '@mui/icons-material/Search';

const Home = () => {

    return (
        <div>
            <div className="search-container">
                <SearchIcon className="search-icon" />
                <input
                    type="text"
                    placeholder="Search items..."
                // value={searchTerm}
                // onChange={handleSearchChange}
                />
            </div>
            <CategoriesList />
        </div>
    );
};

export default Home;
