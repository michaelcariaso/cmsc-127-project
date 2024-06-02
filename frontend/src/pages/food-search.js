import React, { useState, useEffect } from "react";
import Navbar from "./navbar.js";
import { Link, useLocation } from "react-router-dom";
import EstabFoodData from "../components/FoodData.jsx";

const FoodNameSearch = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const establishment_id = params.get("establishment_id");
  const item_name = params.get("item_name");
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/estabs/search-food?establishment_id=${establishment_id}&item_name=${item_name}`);
        const data = await response.json();
        setFoodData(data);
      } catch (error) {
        console.error("Error fetching establishment data:", error);
      }
    };

    console.log(foodData)
    fetchData();
  }, [establishment_id, item_name]);

  return (
    <>
      <Navbar />
      <h1>SEARCH RESULTS FOR "{item_name}"</h1>
      <div className="estab-container">
        <EstabFoodData data={foodData} establishment_id={establishment_id}/>
      </div>
    </>
  );
};

export default FoodNameSearch;
