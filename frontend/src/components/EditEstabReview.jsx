import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import EstabRating from "../pages/view-estabs-rating";

export default function EditEstabReview({ entry_id }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const [estabId, setEstabId] = useState("");

  useEffect(() => {
    console.log(entry_id);
    const fetchReview = async () => {
      //fetch establishment review
      try {
        const response = await fetch(
          `http://localhost:4000/review/findOne?entry_id=${entry_id}`
        );
        const data = await response.json();
        console.log(data);
        setReview(data[0].review);
        setRating(data[0].rating);
        setEstabId(data[0].establishment_id);
      } catch (error) {
        console.error("Failed to fetch review", error);
      }
    };

    fetchReview();
  }, []);

  //validate fields function
  function editReview() {
    console.log(review);
    console.log(rating);
    //check if any of the input fields are empty
    if (review == "") {
      //alert message for incomplete fields
      alert("Please fill out all of the fields first");
      return;
    }

    const entry = {
      review: review,
      rating: rating,
      entry_id: entry_id,
    };

    fetch("http://localhost:4000/review/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update review");
        }
        //alert message for sucess
        alert("Review updated successfully");
        return response.text();
      })
      .then((body) => {
        console.log(body);
        window.location.reload();
      });
  }

  return (
    <div className="update-review-page">
      <div className="update-review-box">
        <h4>Edit Review</h4>
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

        <Link to={`/estabs/food-review?establishment_id=${estabId}`}>
          <button
            id="EditReview"
            onClick={(e) => {
              e.stopPropagation(); // Prevent click event from propagating
              editReview();
            }}
          >
            UPDATE REVIEW
          </button>
        </Link>
        <Link to={`/estabs/food-review?establishment_id=${estabId}`}>
          <button id="EditReview">CANCEL</button>
        </Link>
      </div>
    </div>
  );
}
