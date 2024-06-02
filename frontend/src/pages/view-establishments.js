import React, { useState, useEffect } from "react";
import Navbar from "./navbar.js";
import EstablishmentData from "../components/EstablishmentData.jsx";
import { Link, useNavigate } from "react-router-dom";

const Establishments = () => {
  const [establishmentData, setEstablishmentData] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [foodType, setFoodType] = useState("");
  const [findEstab, setFindEstab] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/estabs");
        const data = await response.json();
        setEstablishmentData(data);
      } catch (error) {
        console.error("Error fetching establishment data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    // Replace empty strings with null
    const queryParams = {
      min_price: minPrice === "" ? "undefined" : minPrice,
      max_price: maxPrice === "" ? "undefined" : maxPrice,
      food_type: foodType === "" ? "undefined" : foodType,
    };

    const queryString = new URLSearchParams(queryParams).toString();

    navigate(`/estabs/food-query?${queryString}`);
  };

  return (
    <>
      <Navbar />
      <h1>ALL ESTABLISHMENTS</h1>
      <div className="estab-container">

        <EstablishmentData data={establishmentData} />
        <div className="estabmenu-container">
          <h1>MENU</h1>
          <Link to={"/estabs/high-rating"}>
            <button>Show High Rating</button>
          </Link>
          <Link to={"/estabs/add-establishment"}>
            <button>Add Food Establishment</button>
          </Link>
          <form className="search-food-params" onSubmit={handleSearchSubmit}>
            <h1>CUSTOM SEARCH</h1>
            <div className="min-max">
              <div>
                <label htmlFor="min-price">Min Price</label>
                <input
                  name="min-price"
                  type="text"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="max-price">Max Price</label>
                <input
                  name="max-price"
                  type="text"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
            <label htmlFor="type">Food Type</label>
            <input
              name="type"
              type="text"
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
            />
            <button type="submit">SUBMIT SEARCH</button>
          </form>
          <div className="find-estab">
            <h1>SEARCH FOR ESTAB</h1>
            <input 
              name="find-estab"
              type="text"
              value={findEstab}
              onChange={(e) => setFindEstab(e.target.value)}  
            />
            <Link to={`/estabs/search-name?establishment_name=${findEstab}`}>
              <button>SEARCH NAME</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Establishments;
