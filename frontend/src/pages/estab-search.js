import React, { useState, useEffect } from "react";
import Navbar from "./navbar.js";
import EstablishmentData from "../components/EstablishmentData.jsx";
import { Link, useLocation } from "react-router-dom";

const EstabSearch = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const establishment_name = params.get("establishment_name");
  const [establishmentData, setEstablishmentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/estabs/search-name?establishment_name=${establishment_name}`);
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
      <h1>SEARCH RESULTS FOR "{establishment_name}"</h1>
      <div className="estab-container">
        <Link to={`/estabs`}>
          <button>RETURN TO ALL ESTABLISHMENTS</button>
        </Link>
        <EstablishmentData data={establishmentData} />
      </div>
    </>
  );
};

export default EstabSearch;
