// ReviewsEstab.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Navbar from "./navbar";
import ReviewsFoodData from "../components/ReviewsFood";

const ReviewsFood = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const item_id = params.get("item_id");
  const establishment_id = params.get("establishment_id");
  const [foodReviewData, setFoodReviewData] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/estabs/food/food-review?item_id=${item_id}`
        );
        const data = await response.json();
        setFoodReviewData(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <>
      <Navbar />
      <div className="reviews-container">
        <ReviewsFoodData
          data={foodReviewData}
          establishment_id={establishment_id}
          item_id={item_id}
        />
        
      </div>
    </>
  );
};

export default ReviewsFood;
