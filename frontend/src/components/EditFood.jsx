import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function EditFood({ item_id }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");
  const [estabId, setEstabId] = useState("");

  useEffect(() => {
    console.log(item_id);
    const fetchFoodItem = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/estabs/food/findOne?item_id=${item_id}`
        );
        const data = await response.json();
        console.log(data[0]);
        setName(data[0].item_name);
        setPrice(data[0].item_price);
        setType(data[0].food_type);
        setEstabId(data[0].establishment_id);
      } catch (error) {
        console.error("Failed to fetch food item", error);
      }
    };

    fetchFoodItem();
  }, []);

  //validate fields function
  function editFoodItem() {
    console.log(name);
    console.log(price);
    console.log(type);
    //check if any of the input fields are empty
    if (name == "" || price == "" || type == "") {
      //alert message for incomplete fields
      alert("Please fill out all of the fields first");
      return;
    }

    const item = {
      item_name: name,
      item_price: price,
      food_type: type,
      item_id: item_id,
    };

    fetch("http://localhost:4000/estabs/food/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update food item");
        }
        //alert message for sucess
        alert("Food item updated successfully");
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
        <h4>Edit Food</h4>
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
                value={type}
                name="food-type"
                id="food-type"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option value="meat">Meat</option>
                <option value="veg">Vegetables</option>
                <option value="etc">Etc.</option>
              </select>
            </div>
          </div>
        </form>

        <Link to={`/estabs/food?establishment_id=${estabId}`}>
          <button
            id="EditFood"
            onClick={(e) => {
              e.stopPropagation(); // Prevent click event from propagating
              editFoodItem();
            }}
          >
            UPDATE FOOD ITEM
          </button>
        </Link>
        <Link to={`/estabs/food?establishment_id=${estabId}`}>
          <button id="EditFood">CANCEL</button>
        </Link>
      </div>
    </div>
  );
}
