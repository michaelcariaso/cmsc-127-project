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

const setUpRoutes = (app) => {
  app.get("/", (req, res) => {
    res.send("API Main Page");
  });

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
};

export default setUpRoutes;
