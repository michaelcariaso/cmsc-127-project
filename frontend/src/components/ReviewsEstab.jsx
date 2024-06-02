import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../css/reviews.css";

export default function ReviewsEstabData(props) {
  useEffect(() => {
    setEstabReviews(props.data);
  }, [props.data]);

  const [reviews, setEstabReviews] = useState(props.data || []);
  const [filteredReviews, setFilteredReviews] = useState(props.data);
  const establishment_id = props.establishment_id;
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [isMonthly, setMonthly] = useState(false);

  useEffect(() => {
    const fetchMonthly = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/estabs/food-review/monthly?month=${month}&year=${year}&establishment_id=${establishment_id}`
        );
        const data = await response.json();
        console.log(data);
        setFilteredReviews(data);
      } catch (error) {
        console.error("Failed to fetch monthly reviews", error);
      }
    };

    fetchMonthly();
  }, [isMonthly]);

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
    <>
      {isMonthly === false && (
        <div className="review-wrapper">
          <div className="reviews-container">
            <div className="review-header">
              <h1>Reviews for {establishment_id}</h1>
              <Link to={"/estabs"}>
                <button>Back to Establishments</button>
              </Link>
            </div>
            {reviews.map((review) => (
              <div key={review.item_id} className="review">
                <p>{review["Display Name"]}</p>
                <p>Review: {review["Review"]}</p>
                <p>Rating: {review["Rating"]}</p>
                <Link
                  to={`/estabs/food-review/update?entry_id=${review["Entry Id"]}`}
                >
                  <button>UPDATE</button>
                </Link>

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
          </div>
          <div className="review-menu">
            <Link
              to={`/estabs/food-review/add-review?establishment_id=${establishment_id}`}
            >
              <button>ADD REVIEW</button>
            </Link>

            <div>
              <form className="search-food-params">
                <h1>MONTHLY REVIEW</h1>
                <div className="min-max">
                  <div>
                    <label htmlFor="month">MONTH</label>
                    <input
                      name="month"
                      type="number"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="year">YEAR</label>
                    <input
                      name="year"
                      type="number"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    />
                  </div>
                </div>
              </form>
              <button
                onClick={() => {
                  setMonthly(true);
                }}
              >
                SUBMIT SEARCH
              </button>
            </div>
          </div>
        </div>
      )}

      {isMonthly === true && filteredReviews != null && (
        <div className="review-wrapper">
          <div className="reviews-container">
            <div className="review-header">
              <h1>Reviews for {establishment_id}</h1>
              <Link to={"/estabs"}>
                <button>Back to Establishments</button>
              </Link>
            </div>
            {filteredReviews.map((review) => (
              <div key={review.item_id} className="review">
                <p>{review["Display Name"]}</p>
                <p>Review: {review["Review"]}</p>
                <p>Rating: {review["Rating"]}</p>

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
          </div>
          <div className="review-menu">
            <div>
              <form className="search-food-params">
                <h1>MONTHLY REVIEW</h1>
                <div className="min-max">
                  <div>
                    <label htmlFor="month">MONTH</label>
                    <input
                      name="month"
                      type="number"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="year">YEAR</label>
                    <input
                      name="year"
                      type="number"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    />
                  </div>
                </div>
              </form>
              <button
                onClick={() => {
                  setMonthly(false);
                  setMonth(0);
                  setYear(0);
                }}
              >
                RESET
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
