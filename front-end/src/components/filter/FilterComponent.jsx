import { AssistWalkerOutlined } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';

const FilterComponent = () => {
  const [categories, setCategories] = useState([]);
  const [prices, setPrices] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);


  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');

  useEffect(() => {


    const fetchData = async () => {
      try {
        const responseCategory = await fetch("http://localhost:8080/rentify/categories");
        if (!responseCategory.ok) {
          throw new Error(`HTTP error! Status: ${responseCategory.status}`);
        }
        const categoriesResponse = await responseCategory.json();
        console.log(categoriesResponse);

        setCategories(categoriesResponse)
      } catch (error) {
        console.error('Error fetching categories:', error);
      }


      try{   
         const responseAddress = await fetch('http://localhost:8080/rentify/addresses');

        if(!responseAddress.ok){
        throw new Error(`HTTP error! Status: ${responseAddress.status}`);

        }

       console.log("responsaa na adresitee")

       const addressResponse = await responseAddress.json();


       if(addressResponse == null)
       {
        console.log("Da ravno e ")
       }
       console.log(addressResponse);
       setAddresses(addressResponse)

      }catch(error){
        console.error("Error fetching Address")
      }

    };

    fetchData();
  }, []);

  const applyFilters = async () => {
    // Make a request to fetch filtered items based on selected filters
    // Use selectedCategory, priceFrom, priceTo, selectedAddress to construct your request
    // Update the state or perform other actions based on the filtered items


    try {
      // Construct the filter parameters based on user input
      const filters = {
        category: selectedCategory,
        priceFrom: parseFloat(priceFrom),
        priceTo: parseFloat(priceTo),
        address: selectedAddress,
      };

      console.log(selectedCategory);
      console.log(priceFrom);
      console.log(priceTo)
      console.log(selectedAddress);
      
  ;

      

  
      // You can now use the 'filters' object to construct your API request
      // For example:
      // const apiUrl = `http://localhost:8080/rentify/items/filter?category=${filters.category}&priceFrom=${filters.priceFrom}&priceTo=${filters.priceTo}&address=${filters.address}`;
      // const apiUrl = `http://localhost:8080/rentify/items/filter?category=${filters.category}&priceFrom=${filters.priceFrom}&priceTo=${filters.priceTo}&address=${filters.address}`;
      // const apiUrl = `http://localhost:8080/rentify/items/filter?category=${filters.category}&priceFrom=${Number(filters.priceFrom) || ''}&priceTo=${Number(filters.priceTo) || ''}&address=${filters.address}`;
      const apiUrl = `http://localhost:8080/rentify/items/filter?category=${filters.category}&priceFrom=${Number(filters.priceFrom) || ''}&priceTo=${Number(filters.priceTo) || ''}&address=${filters.address}`;



  
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const filteredItems = await response.json();
      // Update the state or perform other actions based on the filtered 4
      setFilteredItems(filteredItems);
      console.log('Filtered Items:', filteredItems);
    } catch (error) {
      console.error('Error applying filters:', error);
    }
  };

  return (
    <div>
      <label>Category:</label>
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">All</option>
        {categories.map(category => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>

      <label>Price Range:</label>
      <input type="number" placeholder="From" value={priceFrom} onChange={(e) => setPriceFrom(e.target.value)} />
      <input type="number" placeholder="To" value={priceTo} onChange={(e) => setPriceTo(e.target.value)} />

      <label>City:</label>
      <select value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)}>
        <option value="">All</option>
        {addresses.map(address => (
          <option key={address.id} value={address.city}>
            {address.city}
          </option>
        ))}
      </select>

      <button onClick={applyFilters}>Search</button>
    </div>
  );
};

export default FilterComponent;
