import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../css/food.css";

export default function EstabFoodData({ data, establishment_id }) {
  const [foodData, setFoodData] = useState(data || []);
  const [estabData, setEstabData] = useState([]);

  useEffect(() => {
    console.log("Props Data:", data);
    setFoodData(data);
  }, [data]);

  useEffect(() => {
    const fetchEstab = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/estabs/search?establishment_id=${establishment_id}`
        );
        const data = await response.json();
        setEstabData(data);
        console.log("Fetched Establishment Data:", data);
      } catch (error) {
        console.error("Error fetching establishment data:", error);
      }
    };

    fetchEstab();
  }, [establishment_id]);

  //delete food function
  function deleteFood(item_id) {
    fetch("http://localhost:4000/estabs/food/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item_id: item_id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete food");
        }

        //alert message for sucess
        alert("Food deleted successfully");

        return response.text();
      })
      .then((body) => {
        console.log(body);
      });
  }

  return (
    <div className="inventorytable-container">
      <div className="fooditem-header">
        {estabData[0]?.establishment_name !== undefined && (
          <h1>FOOD ITEMS OF {estabData[0]?.establishment_name}</h1>
        )}
        <Link to={"/estabs"}>
          <button>BACK TO ESTABLISHMENTS</button>
        </Link>
      </div>
      <div className="fooditem-container">
        {foodData.map((food) => (
          <div className="food-group" key={food.item_id}>
            <div className="food-img">
              <img
                src="https://images.unsplash.com/photo-1590779033100-9f60a05a013d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt={food.name}
              />
            </div>
            <div className="food-deets">
              <h1 className="food-name">{food.item_name}</h1>
              <p className="food-price">Price: {food.item_price}</p>
              {food["Average Rating"] !== undefined && (
                <p className="food-rating">AVG. RATING: {food["Average Rating"]}</p>
              )}
              <div className="estab-btn">
                <Link
                  to={`/estabs/food/food-review?establishment_id=${food.establishment_id}&item_id=${food.item_id}`}
                >
                  <button>SEE REVIEWS</button>
                </Link>
              </div>
              <div>
                <Link to={`/estabs/food/update?item_id=${food.item_id}`}>
                  <button>UPDATE</button>
                </Link>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteFood(food.item_id);
                    window.location.reload();
                  }}
                >
                  DELETE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
