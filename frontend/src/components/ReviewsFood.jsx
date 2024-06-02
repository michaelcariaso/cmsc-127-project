import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import "../css/reviews.css";

export default function ReviewsFoodData(props) {
  useEffect(() => {
    setFoodReviews(props.data);
  }, [props.data]);

  const [reviews, setFoodReviews] = useState(props.data || []);

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
      {reviews.map((review) => (
        <div>
          <div key={review.id} className="review">
            <h2>{review["Review"]}</h2>

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
        </div>
      ))}
      <div>
        <Link
          to={`/estabs/food/food-review/add-review?establishment_id=${props.establishment_id}&item_id=${props.item_id}`}
          >
          <button>ADD REVIEW</button>
        </Link>

        <Link to={`/estabs/food?establishment_id=${props.establishment_id}`}>
          <button>Back to Food</button>
        </Link>
      </div>
    </div>
  );
}
