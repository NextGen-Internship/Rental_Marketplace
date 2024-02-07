import React, { useState } from 'react';
import "./Review.css"
import axios from 'axios';


const ReviewsItems = ({ itemId, userId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCancel = () => {

    setRating(0);
    setComment('');
  };

  console.log(rating);
  console.log(comment);

  const handleSend = async () => {


    //localhost:8080/rentify/reviews/addReview/4/4




    const response = await axios.post(`http:/localhost:8080/rentify/reviews/addReview/${userId}/${itemId}`, {
      rating: rating,
      comment: comment
    });





    console.log(response);





  };

  return (
    <div className="card">
      <div className="row">
        <div className="col-2">
          <img src="https://i.imgur.com/xELPaag.jpg" width="70" className="rounded-circle mt-2" alt="User" />
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
                  <div className="pull-left">
                    <button className="btn btn-success btn-sm" onClick={handleCancel}>Cancel</button>
                  </div>
                </div>
                <div className="col-6">
                  <div className="pull-right">
                    <button className="btn btn-success send btn-sm" onClick={handleSend}>Send <i className="fa fa-long-arrow-right ml-1"></i></button>
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
