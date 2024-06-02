import React, { useState, useEffect } from "react";
import Navbar from "./navbar.js";
import EstabFoodData from "../components/FoodData.jsx";
import { useLocation } from "react-router-dom";

const FoodQuery = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const min_price = params.get("min_price");
  const max_price = params.get("max_price");
  const food_type = params.get("food_type");

  const [estabFoodData, setEstabFoodData] = useState([]);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/estabs/food-query?food_type=${food_type}&min_price=${min_price}&max_price=${max_price}`
        );
        const data = await response.json();
        setEstabFoodData(data);
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };

    fetchFood();
  }, [food_type, min_price, max_price]);

  return (
    <>
      <Navbar />
      <h1>Showing Custom Search Results</h1>
      <div className="food-container">
        <EstabFoodData data={estabFoodData} />
      </div>
    </>
  );
};

export default FoodQuery;
