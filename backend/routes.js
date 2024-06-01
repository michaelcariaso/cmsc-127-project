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
  searchFoodItem,
} from "./controllers/reports_controller.js";

import { addUser, searchUser } from "./controllers/user_controller.js";

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
  app.get("/food", searchFoodItem);

  //user
  app.post("/user/add", addUser);
  app.get("/user/search", searchUser);
};

export default setUpRoutes;
