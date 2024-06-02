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
  searchFoodItem,
} from "./controllers/reports_controller.js";

import { addUser, searchUser } from "./controllers/user_controller.js";

import {
  addReview,
  updateReview,
  deleteReview,
} from "./controllers/review_controller.js";

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
  app.get("/food", searchFoodItem);

  //user
  app.post("/user/add", addUser);
  app.get("/user/search", searchUser);

  //food review
  app.post("/review/add", addReview);
  app.post("/review/update", updateReview);
  app.post("/review/delete", deleteReview);
};

export default setUpRoutes;
