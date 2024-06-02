import {
  viewAllEstablishments,
  viewAllReviewsEstablishment,
  viewAllFoodReviewsFoodItem,
  viewAllFoodItems,
  viewAllFoodItemsWithType,
  viewAllMonthlyReviewsEstablishment,
  viewAllMonthlyReviewsFoodItem,
  viewAllHighAverageRatingEstablishments,
  viewAllFoodItemsOrderByPrice,
} from "./controllers/reports_controller.js";

import { addUser, searchUser } from "./controllers/user_controller.js";

import {
  addReview,
  updateReview,
  deleteReview,
} from "./controllers/review_controller.js";

import {
  searchFoodType,
  addFoodItem,
  deleteFoodItem,
  updateFoodItem,
  searchFoodParams,
  searchFoodItem
} from "./controllers/item_controller.js";

import {
  addFoodEstablishment,
  searchFoodEstablishment,
  searchEstabName,
  updateFoodEstablishment,
  deleteFoodEstablishment,
} from "./controllers/estab_controller.js";


const setUpRoutes = (app) => {
  app.get("/", (req, res) => {
    res.send("API Main Page");
  });

  //reports
  app.get("/estabs", viewAllEstablishments);
  app.get("/estabs/high-rating", viewAllHighAverageRatingEstablishments);
  app.get("/estabs/review", viewAllReviewsEstablishment);
  app.get("/estabs/food-review/monthly", viewAllMonthlyReviewsEstablishment);
  app.get("/estabs/food", viewAllFoodItems);
  app.get("/estabs/food/type", viewAllFoodItemsWithType);
  app.get("/estabs/food/food-review", viewAllFoodReviewsFoodItem);
  app.get("/estabs/foods/food-review/monthly", viewAllMonthlyReviewsFoodItem);
  app.get("/foods/order-price", viewAllFoodItemsOrderByPrice);
  app.get("/estabs/search-food", searchFoodItem);

  //user
  app.post("/user/add", addUser);
  app.get("/user/search", searchUser);

  //food review
  app.post("/review/add", addReview);
  app.post("/review/update", updateReview);
  app.post("/review/delete", deleteReview);

  //establishment
  app.post("/estabs/add", addFoodEstablishment);
  app.post("/estabs/edit", updateFoodEstablishment);
  app.post("/estabs/delete", deleteFoodEstablishment);
  app.get("/estabs/search", searchFoodEstablishment);
  app.get("/estabs/search-name", searchEstabName)

  //food item
  app.get("/estabs/food-type", searchFoodType);

  app.get('/estabs/food-query', searchFoodParams);


  app.post("/estabs/food/add", addFoodItem);
  app.post("/estabs/food/delete", deleteFoodItem);
  app.post("/estabs/food/update", updateFoodItem);
};

export default setUpRoutes;
