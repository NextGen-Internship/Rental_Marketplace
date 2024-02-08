import React, { useState } from 'react';
import CategoriesList from '../categories/CategoriesList';
import ItemsList from '../items/ItemsList';
import './Home.css'



const Home = () => {

    return (
        <div className='home'>
            <CategoriesList />

    
            <ItemsList  />

        </div>
    );
};

export default Home;