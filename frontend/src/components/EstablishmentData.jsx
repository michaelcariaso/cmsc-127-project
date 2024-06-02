import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../css/estab.css";

export default function EstablishmentData({ data }) {
  const [establishmentData, setEstablishmentData] = useState(data || []);

  useEffect(() => {
    console.log("Props Data:", data); // Log props data
    setEstablishmentData(data);
  }, [data]);

  //delete review function
  function deleteEstablishment(establishment_id) {
    fetch("http://localhost:4000/estabs/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ establishment_id: establishment_id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete food establishment");
        }

        //alert message for sucess
        alert("Food establishment deleted successfully");

        return response.text();
      })
      .then((body) => {
        console.log(body);
      });
  }

  return (
    <div className="inventorytable-container">
      <div className="establishment-container">
        {establishmentData.map((establishment) => (
          <div
            key={establishment.establishment_id}
            className="establishment-group"
          >
            <div className="establishment-img">
              <img
                src="https://images.unsplash.com/photo-1590779033100-9f60a05a013d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt={establishment.name}
              />
            </div>
            <div className="establishment-deets">
              <h1 className="establishment-name">
                {establishment["Establishment Name"]}
              </h1>
              <p className="establishment-desc">{establishment["Address"]}</p>
              <p className="establishment-type">
                CUISINE: {establishment["Cuisine"]}
              </p>
              <p className="establishment-price">
                AVG. RATING: {establishment["Average Rating"]}
              </p>
              <div className="estab-btn">
                <Link
                  to={`/estabs/food-review?establishment_id=${establishment.establishment_id}`}
                >
                  <button>SEE REVIEWS</button>
                </Link>
                <Link
                  to={`/estabs/food?establishment_id=${establishment.establishment_id}`}
                >
                  <button>FOOD ITEMS</button>
                </Link>
              </div>
              <div>
                <Link
                  to={`/estabs/update?establishment_id=${establishment.establishment_id}`}
                >
                  <button>UPDATE</button>
                </Link>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click event from propagating
                    deleteEstablishment(establishment.establishment_id);
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
