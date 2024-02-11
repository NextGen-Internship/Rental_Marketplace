import React, { useState } from 'react';
import "./Review.css"
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';




const ReviewsItems = ({ itemId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');


  const[showForm, setShowForm] = useState(false);

  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: {
        city: '',
        postCode: '',
        street: '',
        streetNumber: '',
    }
    , profilePicture: ''



});



useEffect(() => {




  const token = localStorage.getItem('token');




  const decoded = jwtDecode(token);
  const userId = decoded.jti;



  const fetchUserInfo = async () => {


    if(token){
      
    }


      try {
          const response = await axios.get(`http://localhost:8080/rentify/users/${userId}`);
          setUserInfo(response.data);

      }
      catch (error) {
          console.error("Error fetching user Info ", error);
      }

  };


  fetchUserInfo();
}, []);



  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCancel = () => {

    
  };

  console.log(rating);
  console.log(comment);

  const handleSend = async () => {


    try{ 
    const token = localStorage.getItem("token");


    const decoded = jwtDecode(token);
    const userId = decoded.jti;
    console.log("useraa idito" + userId);


    const response = await axios.post(`http://localhost:8080/rentify/reviews/addReview/${userId}/${itemId}`, {
      ratingStars: rating,
      comments: comment
    });

    setRating(0);
    setComment('');

  }catch(error){
    console.error(error);

  }

  };

  return (
    <div className="cardRevieRating">
      <div className="row">
        <div className="col-2">
          <img src={userInfo.profilePicture} width="70" className="rounded-circle mt-2" alt="User" />
        </div>
        <div className="col-10">
          <div className="comment-box ml-2">
            <h4>Add a comment</h4>
            <div className="rating">
              <input type="radio" name="rating" value="5" id="5" checked={rating === 5} onChange={handleRatingChange} /><label htmlFor="5">☆</label>
              <input type="radio" name="rating" value="4" id="4" checked={rating === 4} onChange={handleRatingChange} /><label htmlFor="4">☆</label>
              <input type="radio" name="rating" value="3" id="3" checked={rating === 3} onChange={handleRatingChange} /><label htmlFor="3">☆</label>
              <input type="radio" name="rating" value="2" id="2" checked={rating === 2} onChange={handleRatingChange} /><label htmlFor="2">☆</label>
              <input type="radio" name="rating" value="1" id="1" checked={rating === 1} onChange={handleRatingChange} /><label htmlFor="1">☆</label>
            </div>
            <div className="comment-area">
              <textarea className="form-control" placeholder="What is your view?" rows="4" value={comment} onChange={handleCommentChange}></textarea>
            </div>
            <div className="comment-btns mt-2">
              <div className="row">
                <div className="col-6">
                </div>
                <div className="col-6">
                  <div className="pull-right">
                  <button className="btn btn-success send btn-sm custom-blue-button" onClick={handleSend}>Send <i className="fa fa-long-arrow-right ml-1"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsItems;
