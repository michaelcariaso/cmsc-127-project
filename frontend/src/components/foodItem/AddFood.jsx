import { useState } from "react";

export default function AddFood({
  setName,
  setPrice,
  setType,
  setEstablishmentId,
  itemName,
  itemPrice,
  itemType,
  establishmentId,
}) {
  //validate fields function
  function validateFields() {
    //check if any of the input fields are empty
    if (itemName == "" || itemType == "") {
      //alert message for incomplete fields
      alert("Please fill out all of the fields first");
      return;
    }

    //validation for price
    if (itemPrice <= 0) {
      alert("Please enter a valid price");
      return;
    }

    //print validated fields
    console.log("Food Name: " + itemName);
    console.log("Food Type: " + itemType);
    console.log("Food Price: " + itemPrice);

    const item = {
      itemName: itemName,
      itemPrice: itemPrice,
      itemType: itemType,
      establishmentId: establishmentId,
    };

    fetch("http://localhost:4000/admin/add-food", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add food item");
        }
        //alert message for sucess
        alert("Food item added successfully");
        return response.text();
      })
      .then((body) => {
        console.log(body);
      });

    //reset values
    setName("");
    setPrice(0);
    setType("");
  }

  return (
    <div className="add-food-page">
      <div className="add-food-box">
        <h4>Add Food</h4>
        <form>
          <div className="input-div">
            <label>Food Name:</label>
            <input
              value={itemName}
              type="text"
              onChange={(e) => setName(e.target.value)}
              id="itemName"
              name="itemName"
              required
            />
          </div>
          <div className="input-div">
            <label>Food Price:</label>
            <input
              value={itemPrice}
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              id="itemPrice"
              name="itemPrice"
              min="0"
              required
            />
          </div>
          <div className="input-div">
            <label>Product Type:</label>
            <input
              value={itemType}
              onChange={(e) => setType(e.target.value)}
              id="itemType"
              name="itemType"
              required
            ></input>
          </div>
        </form>
        <button id="addFood" onClick={validateFields}>
          ADD PRODUCT
        </button>
      </div>
    </div>
  );
}
