import { pool } from "../database.js";

//view all food items from an establishment
async function viewAllFoodItems(establishment_name, order) {
  const [rows] = await pool.query(
    `SELECT * FROM food_item JOIN food_establishment
      ON food_item.establishment_id=food_establishment.establishment_id
      WHERE food_establishment.establishment_name= ?
      ORDER BY food_item.item_price ${order};`,
    [establishment_name]
  );

  return rows;
}

//view all food items from an establishment that belong to a food type {meat | veg | etc}
async function viewAllFoodItemsWithType(type, establishment_name) {
  const [rows] = await pool.query(
    `SELECT * FROM food_item JOIN food_establishment
      ON food_item.establishment_id=food_establishment.establishment_id
      WHERE food_item.food_type="${type}" AND food_establishment.establishment_name= ?
      ORDER BY food_item.item_price DESC;`,
    [establishment_name]
  );
}

//view all food items from an establishment arranged according to price
async function viewAllFoodItemsOrderByPrice() {
  const [rows] = await pool.query(
    `SELECT item_name, item_price FROM food_item
      WHERE establishment_id = 'INSERT ID HERE'
      ORDER BY item_price;`
  );

  return rows;
}

//search food items from any establishment based on a given price range and/or food type.
async function searchFoodItem() {
  const [rows] = await pool.query(
    `SELECT f.item_id, f.item_name, f.item_price, f.food_type, e.establishment_name FROM
      food_item f JOIN food_establishment e ON f.establishment_id = e.establishment_id
      WHERE ({min_price} IS NULL OR f.item_price >= {min_price})
      OR ({max_price} IS NULL OR f.item_price <= {max_price})
      OR ({food_type} IS NULL OR f.food_type = {food_type});`
  );

  return rows;
}

//ADD, DELETE, SEARCH AND UPDATE FOOD ITEM

//ADD A FOOD ITEM
async function addFoodItem() {
  const result = await pool.query(
    `INSERT INTO food_item (item_id, item_name, item_price, food_type, establishment_id) VALUES
    ("12314", "McWater", "5.00" "beverage", "12345678890");`
  );

  return result;
}

//DELETE A FOOD ITEM
async function deleteFoodItem() {
  const result = await pool.query(
    `DELETE FROM food_item WHERE item_name = "McWater";`
  );

  return result;
}

//UPDATE A FOOD ITEM
async function updateFoodItem() {
  const result = await pool.query(
    `UPDATE food_item SET item_name = "Jolly Hatdog", item_price = "50.00" WHERE item_name =
    "Jolly Hotdog";`
  );

  return result;
}
