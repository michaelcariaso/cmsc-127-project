import { Link, useLocation, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import EditFoodReview from "../components/EditFoodReview";

const UpdateFoodReview = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const entry_id = params.get("entry_id");

  return (
    <>
      <Navbar />
      <div className="update-review-container">
        <EditFoodReview entry_id={entry_id}></EditFoodReview>
      </div>
    </>
  );
};

export default UpdateFoodReview;
