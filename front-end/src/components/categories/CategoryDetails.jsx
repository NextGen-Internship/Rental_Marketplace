import React, { useState, useEffect } from 'react';
import { fetchData } from '../fetchData';
import { useParams } from 'react-router-dom';

const endpoint = 'categories/';

const CategoryDetails = () => {
  const { id } = useParams();
  const [category, setCategory] = useState();

  // todo refactor this, maybe in a service
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const result = await fetchData(endpoint + id) ;
        setCategory(result);
        // console.log(result);
      } catch (error) {
        // Handle error
      }
    };

    fetchCategory();
  }, []);

  return (

    <div>
      { category && <h2>Items in category {category.name} </h2> }
      { category && <p>Category description: {category.description}</p> }
    </div>
  )
}

export default CategoryDetails