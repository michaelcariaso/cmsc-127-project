import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function AddFood({ establishment_id }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("vegie");

  //handle type change
  const handleSelectChange = (event) => {
    setType(event.target.value);
  };

  //validate fields function
  function validateFields() {
    console.log(name);
    console.log(price);
    console.log(type);
    //check if any of the input fields are empty
    if (name == "" || type == "") {
      //alert message for incomplete fields
      alert("Please fill out all of the fields first");
      return;
    }

    //check if the price is valid
    if (price < 0) {
      //alert message for invalid price
      alert("Please enter a valid price");
      return;
    }

    const food = {
      item_name: name,
      item_price: price,
      food_type: type,
      establishment_id: establishment_id,
    };

    fetch("http://localhost:4000/estabs/food/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(food),
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
    setType("vegie");
  }

  return (
    <div className="add-estab-page">
      <div className="add-estab-box">
        <h4>Add Establishment</h4>
        <form>
          <div className="input-div">
            <label>Food Name:</label>
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
            <label>Price:</label>
            <input
              value={price}
              type="text"
              onChange={(e) => setPrice(e.target.value)}
              id="price"
              name="price"
              required
            />
          </div>
          <div className="input-div">
            <label>Food Type:</label>
            <div>
              <select
                name="food-type"
                id="food-type"
                onChange={handleSelectChange}
              >
                <option value="meat">Meat</option>
                <option value="veg">Vegetables</option>
                <option value="etc">Etc.</option>
              </select>
            </div>
          </div>
        </form>

        <Link to={`/estabs/food?establishment_id=${establishment_id}`}>
          <button
            id="AddEstablishment"
            onClick={(e) => {
              e.stopPropagation(); // Prevent click event from propagating
              validateFields();
              window.location.reload();
            }}
          >
            ADD FOOD ITEM
          </button>
        </Link>
      </div>
    </div>
  );
}
