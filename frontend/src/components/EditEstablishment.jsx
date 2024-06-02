import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function EditEstablishment({ establishment_id }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [cuisine, setCuisine] = useState("");

  useEffect(() => {
    console.log(establishment_id);
    const fetchEstablishment = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/estabs/search?establishment_id=${establishment_id}`
        );
        const data = await response.json();
        setName(data[0].establishment_name);
        setAddress(data[0].establishment_address);
        setCuisine(data[0].establishment_cuisine);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    };

    fetchEstablishment();
  }, []);

  //validate fields function
  function editEstablishment() {
    console.log(name);
    console.log(address);
    console.log(cuisine);
    //check if any of the input fields are empty
    if (name == "" || address == "" || cuisine == "") {
      //alert message for incomplete fields
      alert("Please fill out all of the fields first");
      return;
    }

    const estab = {
      establishment_name: name,
      establishment_address: address,
      establishment_cuisine: cuisine,
      establishment_id: establishment_id,
    };

    fetch("http://localhost:4000/estabs/edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(estab),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update food establishment");
        }
        //alert message for sucess
        alert("Food establishment updated successfully");
        return response.text();
      })
      .then((body) => {
        console.log(body);
        window.location.reload();
      });
  }

  return (
    <div className="add-estab-page">
      <div className="add-estab-box">
        <h4>Edit Establishment</h4>
        <form>
          <div className="input-div">
            <label>Establishment Name:</label>
            <input
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
              id="name"
              name="name"
              required
            />
          </div>
          <div className="input-div">
            <label>Establishment Address:</label>
            <input
              value={address}
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              id="address"
              name="address"
              required
            />
          </div>
          <div className="input-div">
            <label>Establishment Cuisine:</label>
            <input
              value={cuisine}
              type="text"
              onChange={(e) => setCuisine(e.target.value)}
              id="cuisine"
              name="cuisine"
              required
            />
          </div>
        </form>

        <Link to={`/estabs`}>
          <button
            id="EditEstablishment"
            onClick={(e) => {
              e.stopPropagation(); // Prevent click event from propagating
              editEstablishment();
            }}
          >
            UPDATE ESTABLISHMENT
          </button>
        </Link>
        <Link to={`/estabs`}>
          <button id="EditEstablishment">CANCEL</button>
        </Link>
      </div>
    </div>
  );
}
