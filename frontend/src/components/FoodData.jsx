import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import "../css/food.css";

export default function FoodData({ data }) {
  const [foodData, setFoodData] = useState(data || []);

  useEffect(() => {
    console.log('Props Data:', data); // Log props data
    setFoodData(data);
  }, [data]);

  return (
    <div className="inventorytable-container">
      <h1>ALL ESTABLISHMENTS</h1>
      <div className="food-container">
        {foodData.map((food) => (
          <div className="food-group" key={food._id}>
            <div className="food-img">
              <img src="https://images.unsplash.com/photo-1590779033100-9f60a05a013d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt={food.name} />
            </div>
            <div className='food-deets'>
              <h1 className="food-name">{food["food Name"]}</h1>
              <p className='food-desc'>{food["Address"]}</p>
              <p className='food-type'>CUISINE: {food["Cuisine"]}</p>
              <p className="food-price">AVG. RATING: {food["Average Rating"]}</p>
              <div className="estab-btn">
                <Link to={`/estabs/food?establishment_id=${food.establishment_id}`}>
                  <button>SEE REVIEWS</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}