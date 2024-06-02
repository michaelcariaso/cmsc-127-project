import React, { useState, useEffect } from "react";
import EstablishmentData from "../components/EstablishmentData";

import "../css/estab.css";

import Navbar from "./navbar.js";
import { Link } from "react-router-dom";

const Establishments = () => {
  const [establishmentData, setEstablishmentData] = useState([]);

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

  return (
    <>
      <Navbar />
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
        </div>
      </div>
    </>
  );
};

export default Establishments;
