import React, { useState, useEffect } from "react";
import EstablishmentData from "../components/EstablishmentData";

const Establishments = () => {
  const [establishmentData, setEstablishmentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/estabs'); // Corrected endpoint with full path
        const data = await response.json();
        setEstablishmentData(data);
      } catch (error) {
        console.error('Error fetching establishment data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <EstablishmentData data={establishmentData} />
    </div>
  );
};

export default Establishments;
