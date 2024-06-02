import {
  viewAllEstablishments,
  viewAllFoodReviewsEstablishment,
  viewAllFoodReviewsFoodItem,
  viewAllFoodItems,
  viewAllFoodItemsWithType,
  viewAllMonthlyReviewsEstablishment,
  viewAllMonthlyReviewsFoodItem,
  viewAllHighAverageRatingEstablishments,
  viewAllFoodItemsOrderByPrice,
  //searchFoodItem,
} from "./controllers/reports_controller.js";

import { addUser, searchUser } from "./controllers/user_controller.js";

import {
  addReview,
  updateReview,
  deleteReview,
} from "./controllers/review_controller.js";

import {
  addFoodItem,
  deleteFoodItem,
  searchFoodItem,
  updateFoodItem,
} from "./controllers/item_controller.js";
const setUpRoutes = (app) => {
  app.get("/", (req, res) => {
    res.send("API Main Page");
  });

  //reports
  app.get("/estabs", viewAllEstablishments);
  app.get("/estabs/food-review", viewAllFoodReviewsEstablishment);
  app.get("/food/food-review", viewAllFoodReviewsFoodItem);
  app.get("/foods", viewAllFoodItems);
  app.get("/foods/type", viewAllFoodItemsWithType);
  app.get("/estabs/food-review/monthly", viewAllMonthlyReviewsEstablishment);
  app.get("/foods/food-review/monthly", viewAllMonthlyReviewsFoodItem);
  app.get("/estabs/high-rating", viewAllHighAverageRatingEstablishments);
  app.get("/foods/order-price", viewAllFoodItemsOrderByPrice);
  //app.get("/food", searchFoodItem);

  //user
  app.post("/user/add", addUser);
  app.get("/user/search", searchUser);

  //food review
  app.post("/review/add", addReview);
  app.post("/review/update", updateReview);
  app.post("/review/delete", deleteReview);

  //food item
  app.post("/food/add-item", addFoodItem);
  app.post("/food/delete-item", deleteFoodItem);
  app.get("/food/search-item", searchFoodItem);
  app.post("/food/update-item", updateFoodItem);
};

export default setUpRoutes;
