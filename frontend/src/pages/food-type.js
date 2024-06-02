import React, { useState, useEffect } from "react";
import Navbar from "./navbar.js";
import EstabFoodData from "../components/FoodData.jsx";
import { useLocation } from "react-router-dom";

const FoodType = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const establishment_id = params.get("establishment_id");
  
  const [estabFoodData, setEstabFoodData] = useState([]);
  const [selectedFoodType, setSelectedFoodType] = useState("meat");

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/estabs/food-type?food_type=${selectedFoodType}&establishment_id=${establishment_id}`
        );
        const data = await response.json();
        setEstabFoodData(data);
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };

    fetchFood();
  }, [establishment_id, selectedFoodType]);

  const handleSelectChange = (event) => {
    setSelectedFoodType(event.target.value);
  };

  return (
    <>
      <Navbar />
      <p>Show Results for "{selectedFoodType}"</p>
      <div className="food-container">
        <EstabFoodData data={estabFoodData} establishment_id={establishment_id}/>
        <div className="foodmenu-container">
          <div className="search-food-type">
            <label htmlFor="food-type-filter">Search by Food Type</label>
            <div>
              <select name="food-type-filter" id="food-type" onChange={handleSelectChange}>
                <option value="meat">Meat</option>
                <option value="veg">Vegetables</option>
                <option value="etc">Etc.</option>
              </select>
            </div>
        
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodType;
