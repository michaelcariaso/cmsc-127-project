import React, { useEffect, useState } from "react";
import AddFood from "../components/AddFood";
import EditFood from "../components/EditFood";

export default function FoodItems() {
  const [foodItems, setFoodItems] = useState([]);
  const [itemName, setName] = useState("");
  const [itemPrice, setPrice] = useState(0);
  const [itemType, setType] = useState("");
  const [establishmentId, setEstablishmentId] = useState("");

  const [edit, setEdit] = useState(false);
  const [foodDet, setFoodDet] = useState({});

  function fetchFoodItems() {
    fetch("http://localhost:4000/foods")
      .then((response) => response.json())
      .then((body) => {
        setFoodItems(body);
      });
  }

  //fetch products whenever there is a change to each of the states in this array
  useEffect(() => {
    fetchFoodItems();
  }, [foodItems, itemName, itemPrice, itemType, establishmentId, edit]);

  //delete product function
  function deleteItem(item_id) {
    fetch("http://localhost:4000/remove-food", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item_id: item_id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete food item");
        }

        //alert message for sucess
        alert("Food item deleted successfully");

        return response.text();
      })
      .then((body) => {
        console.log(body);
        fetchFoodItems();
      });
  }

  return (
    <>
      {edit === false && (
        <div className="admin-foods-main">
          <div className="add-food-div">
            <AddFood
              setName={setName}
              setPrice={setPrice}
              setType={setType}
              setEstablishmentId={setEstablishmentId}
              //fields
              itemName={itemName}
              itemPrice={itemPrice}
              itemType={itemType}
              establishmentId={establishmentId}
            ></AddFood>
          </div>

          <div className="display-food-card-div">
            {foodItems.map((food) => (
              <div className="food-info-div">
                <div className="food-name-div">
                  <a>{food.item_name}</a>
                </div>
                <div className="food-price-div">
                  <a>Price: {food.item_price}</a>
                </div>
                <div className="food-type-div">
                  <a>Food Type: {food.food_type}</a>
                </div>
                <div className="food-button-div">
                  <button
                    id="food-edit"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click event from propagating
                      // Set product details for editing
                      setFoodDet({
                        item_id: food.item_id,
                        item_name: food.item_name,
                        item_price: food.item_price,
                        food_type: food.food_type,
                        establishment_id: food.establishment_id,
                      });
                      // Toggle the edit state
                      setEdit(!edit);
                    }}
                  >
                    EDIT
                  </button>

                  <button
                    id="food-delete"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click event from propagating
                      deleteItem(food.item_id);
                    }}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {edit === true && (
        <EditFood setEdit={setEdit} foodDet={foodDet}></EditFood>
      )}
    </>
  );
}
