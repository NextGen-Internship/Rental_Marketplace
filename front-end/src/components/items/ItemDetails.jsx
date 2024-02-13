import React, { useState, useEffect } from "react";
import { fetchData } from "../fetchData";
import { useParams, useNavigate } from "react-router-dom";
import Carousel from "./carousel/Carousel";
import "./ItemDetails.css";
import { jwtDecode } from "jwt-decode";
import ReviewsItems from "../reviews-items/ReviewsItems";
import ShowReviews from "../reviews-items/ShowReviews";
import axios from 'axios';



const endpoint = "items/";


const ItemDetails = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [showReviews, setShowReviews] = useState(false);
  const [averageRating , setAverageRating] = useState(0);



  let userId = "";


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token !== null) {
      const decoded = jwtDecode(token);
      userId = decoded.jti;
      setIsLoggedIn(true);
    }

    const fetchItem = async () => {
      try {
        const result = await fetchData(endpoint + id);
        setItem(result);
      } catch (error) {
        navigate("/notfound");
      }
    };

    const fetchRating = async () => {
      
    
      
      try {
          const response = await axios.get(`http://localhost:8080/rentify/reviews/rating/${id}`);
          setAverageRating(response.data)

      }
      catch (error) {
          console.error("Error fetching user Info ", error);
      }

  };

    if (!item) {
      fetchItem();
    }

    fetchRating();
  }, [item, id, navigate]);


  const handleButtonClick = () => {
   
    if (isLoggedIn) {
   
      setShowReviews(true);

    } else {

      navigate("/login");
    }


  };

  return (
    <div className="item-details-container">
      {item && (
        <div className="item-details-content">
          <h1 className="item-name">{item.name}</h1>

          <Carousel className="carousel" />

          <div className="description-box">
            <h2>Description</h2>
            <p>
              {item.description +
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"}
            </p>
          </div>
          
          <div className="price-deposit-box">
           
           <div class="row justify-content-between">
    <div class="col-md-4 text-center">
        <div>
            <h3>Price</h3>
            <p>{"$" + item.price}</p>
            <h3>Deposit</h3>
            <p>{"$" + item.deposit}</p>
        </div>
    </div>
    <div class="col-md-4 text-center">
        <div class="ratingBox">
            <h1 class="pt-4">{averageRating}</h1>
            <p>out of 5</p>
        </div>
        <div>
            <span class="fa fa-star star-active"></span>
            <span class="fa fa-star star-active"></span>
            <span class="fa fa-star star-active"></span>
            <span class="fa fa-star star-active"></span>
            <span class="fa fa-star star-inactive"></span>
        </div>
    </div>
</div>        
            <button className="rent-button">Rent</button>
      
       <ShowReviews  itemId={id}/>
        </div>
          <div className="user-details">
            <h3>Posted on</h3>
            <p>
              {new Date(...item.postedDate).toLocaleString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
            <h3>Posted by</h3>
            <p>{item.user.firstName + " " + item.user.lastName}</p>
            <button className="message-button" onClick={handleButtonClick}>
              Add Review
            </button>


            {showReviews && <ReviewsItems itemId={id} />}

          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;
