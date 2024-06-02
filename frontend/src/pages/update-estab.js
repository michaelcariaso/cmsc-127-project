import { Link, useLocation, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import EditEstablishment from "../components/EditEstablishment";

const UpdateEstablishment = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const establishment_id = params.get("establishment_id");

  return (
    <>
      <Navbar />
      <div className="update-estab-container">
        <EditEstablishment
          establishment_id={establishment_id}
        ></EditEstablishment>
      </div>
    </>
  );
};

export default UpdateEstablishment;
