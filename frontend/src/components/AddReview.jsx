import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function AddReviewData({ establishment_id, item_id }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const username = "mike123";
  //validate fields function
  function validateFields() {
    console.log(establishment_id);
    console.log(item_id);
    console.log(review);
    console.log(rating);
    //check if any of the input fields are empty
    if (review == "" || rating == 1) {
      //alert message for incomplete fields
      alert("Please fill out all of the fields first");
      return;
    }

    //validation for price
    if (rating < 1) {
      alert("Please enter a valid rating");
      return;
    }

    //if establishment review (no item id)
    if (!item_id) {
      const entry = {
        review: review,
        rating: rating,
        username: username,
        establishment_id: establishment_id,
        item_id: null,
      };

      fetch("http://localhost:4000/review/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to add establishment review");
          }
          //alert message for sucess
          alert("Establishment review added successfully");
          return response.text();
        })
        .then((body) => {
          console.log(body);
        });
    }
    //food review
    else {
      const entry = {
        review: review,
        rating: rating,
        username: username,
        establishment_id: establishment_id,
        item_id: item_id,
      };

      fetch("http://localhost:4000/review/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to add food review");
          }
          //alert message for sucess
          alert("Food review added successfully");
          return response.text();
        })
        .then((body) => {
          console.log(body);
        });
    }

    //reset values
    setReview("");
    setRating(1);
  }

  return (
    <div className="add-review-page">
      <div className="add-review-box">
        <h4>Add Review</h4>
        <form>
          <div className="input-div">
            <label>Review:</label>
            <input
              value={review}
              type="text"
              onChange={(e) => setReview(e.target.value)}
              id="review"
              name="review"
              required
            />
          </div>
          <div className="input-div">
            <label>Rating (1-5):</label>
            <input
              value={rating}
              type="range"
              onChange={(e) => setRating(e.target.value)}
              id="rating"
              name="rating"
              step="1"
              min="1"
              max="5"
              required
            />
          </div>
        </form>

        {item_id === null && (
          <Link to={`/estabs/food-review?establishment_id=${establishment_id}`}>
            <button id="addReview" onClick={validateFields}>
              SUBMIT REVIEW
            </button>
          </Link>
        )}

        {item_id != null && (
          <Link
            to={`/estabs/food/food-review?establishment_id=${establishment_id}&item_id=${item_id}`}
          >
            <button id="addReview" onClick={validateFields}>
              SUBMIT REVIEW
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
