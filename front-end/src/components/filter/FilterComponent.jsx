
import React, { useState, useEffect } from 'react';
import "./Filter.css"
import SearchIcon from '@mui/icons-material/Search';
import { object } from 'yup';
import { South } from '@mui/icons-material';



const FilterComponent = ({ notShowDropdown,categoryId  ,onFilterChange} ) => {
  const [categories, setCategories] = useState([]);
  const [prices, setPrices] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);


  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');



  const [searchTerm, setSearchTerm] = useState('');


 



  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
};

    
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


       const addressResponse = await responseAddress.json();


       setAddresses(addressResponse)

      }catch(error){
        console.error("Error fetching Address")
      }

    };

    fetchData();
  }, []);

  const applyFilters = async () => {

    try {
      let selectedCategoryId;
      
      if (notShowDropdown) {
        console.log("notShowDropdown exists and is true");
        console.log(notShowDropdown['categoryId']);
    
        // selectedCategory = Object.keys(categoryId);
        // selectedCategory = (categoryId.categoryId);

        // console.log("categoriqqqqqqq")
        // console.log(categoryId);
        // setSelectedCategory(categoryId);


        setSelectedCategory(notShowDropdown['categoryId']);  

      }
      else{
        selectedCategoryId = selectedCategory;

      }

      // console.log(selectedCategory);

      const filters = {
        category: selectedCategory,
        priceFrom: parseFloat(priceFrom),
        priceTo: parseFloat(priceTo),
        address: selectedAddress,
        name: searchTerm,
    };
  
  


    console.log("iddd na categoriqqqqq");
    console.log(selectedCategory);
      console.log("tursene po imeeee :")
      console.log(searchTerm)
      
      const apiUrl = `http://localhost:8080/rentify/items/filter?category=${filters.category}&priceFrom=${filters.priceFrom || ''}&priceTo=${filters.priceTo || ''}&address=${filters.address}&searchTerm=${filters.name}`;



  
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
     
      
      const filteredItems = await response.json();

      
      onFilterChange(filteredItems);
      console.log('Filtered Items:', filteredItems);
    } catch (error) {
      console.error('Error applying filters:', error);
    }

   
  };

  
  const handleKeyPress = (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      applyFilters()
    }
  }




return (
  <div className="filter-container">
    <div className="search-container">
      <SearchIcon className="search-icon" />
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
      />
    </div>

    {!notShowDropdown || Object.keys(notShowDropdown).length === 0  ? (
      <div>
        <label className="filter-label">Category:</label>
        <select
          className="filter-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
    


        <label className="filter-label">Price Range:</label>
        <input
          className="filter-input"
          type="number"
          placeholder="From"
          value={priceFrom}
          onChange={(e) => setPriceFrom(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <input
          className="filter-input"
          type="number"
          placeholder="To"
          value={priceTo}
          onChange={(e) => setPriceTo(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <label className="filter-label">City:</label>
        <select
          className="filter-select"
          value={selectedAddress}
          onChange={(e) => setSelectedAddress(e.target.value)}
        >
          <option value="">All</option>
          {addresses.map((address) => (
            <option key={address.id} value={address.name}>
              {address.city}
            </option>
          ))}
        </select>

        <button className="filter-button" onClick={applyFilters}>
          Search
        </button>
      </div>
      
    ) : (
      <div>
        <label className="filter-label">Price Range:</label>
        <input
          className="filter-input"
          type="number"
          placeholder="From"
          value={priceFrom}
          onChange={(e) => setPriceFrom(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <input
          className="filter-input"
          type="number"
          placeholder="To"
          value={priceTo}
          onChange={(e) => setPriceTo(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <label className="filter-label">City:</label>
        <select
          className="filter-select"
          value={selectedAddress}
          onChange={(e) => setSelectedAddress(e.target.value)}
        >
          <option value="">All</option>
          {addresses.map((address) => (
            <option key={address.id} value={address.name}>
              {address.city}
            </option>
          ))}
        </select>

        <button className="filter-button" onClick={applyFilters}>
          Search
        </button>
      </div>
    )}
  </div>
);
}



export default FilterComponent;