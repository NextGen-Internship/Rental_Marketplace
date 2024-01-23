// Carousel.js
import React, { useState } from 'react';
import './Carousel.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Carousel = () => {

    // todo fetch images from backend
    const images = [
      'https://placekitten.com/600/300',
      'https://placekitten.com/601/300',
      'https://placekitten.com/602/300'
      // Add more image URLs as needed
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    const prevSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
  
    return (
      <div className="carousel">
        <button className="arrow-button prev" onClick={prevSlide}>
          <ArrowBackIosIcon className="arrow-icon" />
        </button>
        <img src={images[currentIndex]} alt={`slide ${currentIndex + 1}`} />
        <button className="arrow-button next" onClick={nextSlide}>
          <ArrowForwardIosIcon className="arrow-icon" />
        </button>
      </div>
    );
};

export default Carousel;
