import React, { useState, useEffect } from "react";
import EstablishmentData from "../components/EstablishmentData";

import "../css/estab.css";

import Navbar from "./navbar.js";
import { useLocation } from "react-router-dom";
import EstabFoodData from "../components/FoodData.jsx";

const EstabFoods = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const establishment_id = params.get("establishment_id");
  const [estabFoodData, setEstabFoodData] = useState([]);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/estabs/food?establishment_id=${establishment_id}`
        );
        const data = await response.json();
        setEstabFoodData(data);
      } catch (error) {
        console.error("Error fetching establishment data:", error);
      }
    };

    fetchFood();
  }, []);

  return (
    <>
      <Navbar />
      <div className="food-container">
        <EstabFoodData data={estabFoodData} />
      </div>
    </>
  );
};

export default EstabFoods;
