import React, { useState, useEffect } from "react";
import EstablishmentData from "../components/EstablishmentData";

import "../css/estab.css";

import Navbar from "./navbar.js";

const Establishments = () => {
  const [establishmentData, setEstablishmentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/estabs"); // Corrected endpoint with full path
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
        </div>
      </div>
    </>
  );
};

export default Establishments;
