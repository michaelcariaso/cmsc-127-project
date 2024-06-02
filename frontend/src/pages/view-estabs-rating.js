import React, { useState, useEffect } from "react";
import EstablishmentData from "../components/EstablishmentData";

import '../css/estab.css';

import Navbar from "./navbar.js";
import { Link } from "react-router-dom";

const EstabRating = () => {
  const [estabRatingData, setEstabRatingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/estabs/high-rating');
        const data = await response.json();
        setEstabRatingData(data);
      } catch (error) {
        console.error('Error fetching establishment data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <h1>SHOWING ESTABLISHMENTS WITH HIGH AVERAGE RATING</h1>
      <div className = "estab-container">
        <EstablishmentData data={estabRatingData} />
        <div className = "estabmenu-container">
          <h1>MENU</h1>
          <Link to={'/estabs'}>
            <button>Back to Establishments</button>
          </Link>
        </div>
      </div>
    </>  
  );
};

export default EstabRating;
