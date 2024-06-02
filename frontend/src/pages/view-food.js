import React, { useState, useEffect } from "react";
import Navbar from "./navbar.js";
import { Link, useLocation } from "react-router-dom";
import EstabFoodData from "../components/FoodData.jsx";
import AddFood from "../components/AddFood.jsx";

const EstabFoods = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const establishment_id = params.get("establishment_id");
  const [estabFoodData, setEstabFoodData] = useState([]);

  const [selectedFoodType, setSelectedFoodType] = useState("meat");

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/estabs/food?establishment_id=${establishment_id}`
        );
        const data = await response.json();
        setEstabFoodData(data);
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };

    fetchFood();
  }, [establishment_id]);

  const handleSelectChange = (event) => {
    setSelectedFoodType(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="food-container">
        <EstabFoodData
          data={estabFoodData}
          establishment_id={establishment_id}
        />
        <div className="foodmenu-container">
          {/* <div className="search-food-name">
            <label for="food-name-filter">Search by Name</label>
            <div className="fsearch">
              <input type="text" id ="food-name"></input>
              <button>SEARCH</button>
            </div>
          </div> */}
          <div className="search-food-type">
            <div>
              <Link
                to={`/estabs/food-type?food_type=${selectedFoodType}&establishment_id=${establishment_id}`}
              >
                <button>Search by Food Type</button>
              </Link>
            </div>
          </div>
          <div className="add-food-container">
            <div className="add-food">
              <h1>ADD FOOD</h1>
              <AddFood establishment_id={establishment_id}></AddFood>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EstabFoods;
