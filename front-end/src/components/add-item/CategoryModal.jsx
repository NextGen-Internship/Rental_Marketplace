import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { style } from './CategoryModalStyles';
import axios from 'axios';

export default function CategoryModal({ onSelectCategory }) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCategoryClick = (category) => {
    onSelectCategory(category);
    handleClose();
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/rentify/categories');
        setCategories(response.data); 
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };

    fetchCategories();
  }, []); 

  return (
    <div>
      <Button style={style.text} onClick={handleOpen}>
        Select category
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h1>Choose Category</h1>
          <ul style={style.ul}>
            {categories.map((category) => (
              <li
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}  
                style={style.li}
              >
                {category.name}  
              </li>
            ))}
          </ul>
        </Box>
      </Modal>
    </div>
  );
}