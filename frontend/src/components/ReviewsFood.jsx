import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import "../css/reviews.css";

export default function ReviewsFoodData(props) {
  useEffect(() => {
    setFoodReviews(props.data);
  }, [props.data]);

  const [reviews, setFoodReviews] = useState(props.data || []);

  return (
    <div className="reviews-container">
      <h1>Reviews</h1>
      <Link to={`/estabs/food?establishment_id=${props.establishment_id}`}>
        <button>Back to Food</button>
      </Link>
      {reviews.map((reviews) => (
        <div key={reviews.id} className="review">
          <h2>{reviews["Review"]}</h2>
          {/* <p>{review.Review}</p>
          <p>Rating: {review.Rating}</p>
          <p>Reviewed by: {review["Display Name"]} on {new Date(review.Date).toLocaleDateString()} at {review.Time}</p> */}
        </div>
      ))}
    </div>
  );
}
