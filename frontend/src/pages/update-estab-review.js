import { Link, useLocation, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import EditEstabReview from "../components/EditEstabReview";

const UpdateEstabReview = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const entry_id = params.get("entry_id");

  return (
    <>
      <Navbar />
      <div className="update-review-container">
        <EditEstabReview entry_id={entry_id}></EditEstabReview>
      </div>
    </>
  );
};

export default UpdateEstabReview;
