import React, { useState, useEffect } from 'react';

export default function EstablishmentData({ data }) {
  const [establishmentData, setEstablishmentData] = useState(data || []);

  useEffect(() => {
    console.log('Props Data:', data); // Log props data
    setEstablishmentData(data);
  }, [data]);

  return (
    <div className="inventorytable-container">
      <h1>ALL ESTABLISHMENTS</h1>
      <table className="inventory-table" cellSpacing={0}>
        <thead>
          <tr>
            <th>Establishment Name</th>
            <th>Address</th>
            <th>Cuisine</th>
            <th>Price Range</th>
            <th>Avg. Rating</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {establishmentData.map((establishment, index) => (
            <tr key={index}>
              <td>{establishment["Establishment Name"]}</td>
              <td>{establishment["Address"]}</td>
              <td>{establishment["Cuisine"]}</td>
              <td>{establishment["Price Range"]}</td>
              <td>{establishment["Average Rating"]}</td>
              <td className="inv-edit-btn">EDIT</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
