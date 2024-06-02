import { useState } from "react";

export default function EditFood({ setEdit, foodDet }) {
  //details
  const [itemName, setName] = useState(foodDet.item_name);
  const [itemPrice, setPrice] = useState(foodDet.item_price);
  const [itemType, setType] = useState(foodDet.item_type);

  //edit product function
  function editFood() {
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

    fetch("http://localhost:4000/admin/edit-food", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemName: itemName,
        itemPrice: itemPrice,
        itemType: itemType,
        establishmentId: foodDet.establishmentId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to edit food");
        }

        //alert message for sucess
        alert("Food edited successfully");
        return response.text();
      })
      .then((body) => {
        console.log(body);
      });
  }

  return (
    <div className="editPage">
      <div className="edit-product-box">
        <div className="edit-head">
          <h4>Edit Product</h4>
        </div>
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
        <button
          id="save"
          onClick={() => {
            console.log(foodDet);

            setEdit(false);
          }}
        >
          SAVE CHANGES
        </button>
        <button
          id="cancel"
          onClick={() => {
            setEdit(false);
          }}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
}
