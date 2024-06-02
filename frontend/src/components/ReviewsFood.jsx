import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import "../css/reviews.css";

export default function ReviewsFoodData(props) {
  useEffect(() => {
    setFoodReviews(props.data);
  }, [props.data]);

  const [reviews, setFoodReviews] = useState(props.data || []);
  const [filteredReviews, setFilteredReviews] = useState(props.data);
  const item_id = props.item_id;
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [isMonthly, setMonthly] = useState(false);

  useEffect(() => {
    const fetchMonthly = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/estabs/foods/food-review/monthly?month=${month}&year=${year}&item_id=${item_id}`
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
        <div className="reviews-container">
          <h1>Reviews</h1>
          {reviews.map((review) => (
            <div key={review.entry_id} className="review">
              <h2>{review["Review"]}</h2>

              <Link
                to={`/estabs/food/food-review/update?entry_id=${review["Entry Id"]}`}
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
          <div>
            <Link
              to={`/estabs/food/food-review/add-review?establishment_id=${props.establishment_id}&item_id=${props.item_id}`}
            >
              <button>ADD REVIEW</button>
            </Link>

            <div>
              <form className="search-food-params">
                <h1>MONTHLY REVIEW</h1>
                <div className="min-max">
                  <div>
                    <label htmlFor="min-price">MONTH</label>
                    <input
                      name="min-price"
                      type="text"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="max-price">YEAR</label>
                    <input
                      name="max-price"
                      type="text"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div>
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
        <div className="reviews-container">
          <h1>Reviews</h1>
          {filteredReviews.map((review) => (
            <div key={review.entry_id} className="review">
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
          ))}
          <div>
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
            </div>
            <div>
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
