import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
// import "../css/reviews.css";

export default function ReviewsEstabData (props){
    
    useEffect(()=>{
        setEstabReviews(props.data);
    }, [props.data]);
    
    const [reviews, setEstabReviews] = useState( props.data || []);
  

  return (
    <div className="reviews-container">
      <h1>Reviews</h1>
      <Link to={'/estabs'}>
        <button>Back to Establishments</button>
      </Link>
      {reviews.map((review) => (
        <div key={review.id} className="review">
          <h2>{review["Food Name"]}</h2>
          {/* <p>{review.Review}</p>
          <p>Rating: {review.Rating}</p>
          <p>Reviewed by: {review["Display Name"]} on {new Date(review.Date).toLocaleDateString()} at {review.Time}</p> */}
        </div>
      ))}
    </div>
  );
};
