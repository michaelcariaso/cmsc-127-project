import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Navbar from "./navbar";
import ReviewsEstabData from "../components/ReviewsEstab";

const ReviewsEstab = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const establishment_id = params.get("establishment_id");
  const [estabReviewData, setEstabReviewData] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/estabs/food-review?establishment_id=${establishment_id}`
        );
        const data = await response.json();
        setEstabReviewData(data);
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
        <ReviewsEstabData data={estabReviewData} />
      </div>
    </>
  );
};

export default ReviewsEstab;
