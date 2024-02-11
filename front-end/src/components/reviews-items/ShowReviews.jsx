import React from 'react';
import "./ShowReviews.css"
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from "react";



const ShowReviews = ({itemId , loggedInUserId }) => { 



    const [averageRating , setAverageRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [showAllReviews, setShowAllReviews] = useState(false);
    console.log("idiito na itemaa v show review")
    console.log(itemId);

    useEffect(() => {

      
        const fetchRating = async () => {
      
    
      
            try {

                //http://localhost:8080/rentify/reviews/rating/1
                const response = await axios.get(`http://localhost:8080/rentify/reviews/rating/${itemId}`);
                setAverageRating(response.data)
          
                console.log("averagee");
                console.log(response.data);
      
            }
            catch (error) {
                console.error("Error fetching user Info ", error);
            }
      
        };

        //http://localhost:8080/rentify/reviews/4

        const fetchReviews = async () => {


            try {
                const response = await axios.get(`http://localhost:8080/rentify/reviews/${itemId}`);

                setReviews(response.data);

                console.log("responsaa na revutatat ")
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                return [];
            }
        };
      
      
        fetchRating();
        fetchReviews();
      }, []);
      

      const handleEditReview = (index) => {
        // Logic to handle edit action for the review at index
        console.log('Edit review:', reviews[index]);
    };


      const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);


  return (

<div class="container-fluid px-1 py-5 mx-auto">
    <div class="row justify-content-center">
        <div class="col-xl-7 col-lg-8 col-md-10 col-12 text-center mb-5">
            <div class="cardShowReviews">
                <div class="row justify-content-rigt d-flex">
                    <div class="col-md-4 d-flex flex-column">
                        <div class="rating-box">
                            <h1 class="pt-4">{averageRating}</h1>
                            <p class="">out of 5</p>
                        </div>
                        <div> <span class="fa fa-star star-active mx-1"></span> <span class="fa fa-star star-active mx-1"></span> <span class="fa fa-star star-active mx-1"></span> <span class="fa fa-star star-active mx-1"></span> <span class="fa fa-star star-inactive mx-1"></span> </div>
                    </div>
                   
                </div>
            </div>
            <div>
            <h2>Reviews</h2>
            {displayedReviews.map((review, index) => (
                <div className="cardProfileReview" key={index}>
                    <div className="row d-flex">
                        <div> 
                            <img className="profile-pic" src={review.profilePicture} alt="Profile" />
                        </div>
                        <div className="d-flex flex-column">
                            <h3 className="mt-2 mb-0">{review.firstName} {review.lastName}</h3>
                            <div>
                                <p className="text-left">
                                    <span className="text-muted">{review.stars.toFixed(1)}</span>
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`fa fa-star ${i < review.stars ? 'star-active' : 'star-inactive'}`}></span>
                                    ))}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row text-left">
                        <h4 className="blue-text mt-3">{review.comment}</h4>
                        <p className="content">{review.content}</p>
                        {review.userId === loggedInUserId && (
                            <button onClick={() => handleEditReview(index)}>Edit Review</button>
                        )}
                    </div>
                </div>
            ))}
            {reviews.length > 3 && (
                <button onClick={() => setShowAllReviews(!showAllReviews)}>
                    {showAllReviews ? 'Show Less' : 'Show More'}
                </button>
            )}
        </div>
        </div>
    </div>
</div>

  );
}



export default ShowReviews;
