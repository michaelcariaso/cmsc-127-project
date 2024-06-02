import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import "../css/reviews.css";

export default function ReviewsEstabData(props) {
  useEffect(() => {
    setEstabReviews(props.data);
  }, [props.data]);

  const [reviews, setEstabReviews] = useState(props.data || []);
  const establishment_id = props.establishment_id;

  //delete review function
  function deleteReview(entry_id) {
    fetch("http://localhost:4000/review/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entry_id: entry_id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete review");
        }

        //alert message for sucess
        alert("Review deleted successfully");

        return response.text();
      })
      .then((body) => {
        console.log(body);
      });
  }

  return (
    <div className="reviews-container">
      <h1>Reviews</h1>
      <Link to={"/estabs"}>
        <button>Back to Establishments</button>
      </Link>
      {reviews.map((review) => (
        <div>
          <div key={review.id} className="review">
            <h2>Review: {review["Review"]}</h2>
            <h2>Rating: {review["Rating"]}</h2>
            {/* <p>{review.Review}</p>
          <p>Rating: {review.Rating}</p>
          <p>Reviewed by: {review["Display Name"]} on {new Date(review.Date).toLocaleDateString()} at {review.Time}</p> */}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent click event from propagating
              deleteReview(review.entry_id);
              window.location.reload();
            }}
          >
            DELETE REVIEW
          </button>
        </div>
      ))}

      <Link
        to={`/estabs/food-review/add-review?establishment_id=${establishment_id}`}
      >
        <button>ADD REVIEW</button>
      </Link>
    </div>
  );
}
