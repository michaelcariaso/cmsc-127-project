import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function AddEstablishment() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [cuisine, setCuisine] = useState("");

  //validate fields function
  function validateFields() {
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
    };

    fetch("http://localhost:4000/estabs/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(estab),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add food establishment");
        }
        //alert message for sucess
        alert("Food establishment added successfully");
        return response.text();
      })
      .then((body) => {
        console.log(body);
      });

    //reset values
    setName("");
    setAddress("");
    setCuisine("");
  }

  return (
    <div className="add-estab-page">
      <div className="add-estab-box">
        <h4>Add Establishment</h4>
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
          <button id="AddEstablishment" onClick={validateFields}>
            ADD ESTABLISHMENT
          </button>
        </Link>
        <Link to={`/estabs`}>
          <button id="AddEstablishment">CANCEL</button>
        </Link>
      </div>
    </div>
  );
}
