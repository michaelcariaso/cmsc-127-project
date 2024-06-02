import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import LogIn from "./pages/log-in.js";
import SignUp from "./pages/sign-up.js";

import Establishments from "./pages/view-establishments";
import ReviewsEstab from "./pages/estab-review.js";
import EstabFood from "./pages/view-food.js";
import ReviewsFood from "./pages/food-review.js";
import AddReview from "./pages/add-review.js";

import EstabRating from "./pages/view-estabs-rating.js";
import AddEstablishment from "./components/AddEstablishment.jsx";

import FoodType from "./pages/food-type.js";


const router = createBrowserRouter([
  //LOGIN/SIGNUP
  { path: "/", element: <LogIn /> },
  { path: "/sign-up", element: <SignUp /> },
  //MENU/ESTABS LIST
  { path: "/estabs", element: <Establishments /> },
  { path: "/estabs/high-rating", element: <EstabRating /> },
  { path: "/estabs/add-establishment", element: <AddEstablishment /> },
  //REVIEWS OF ESTAB
  { path: "/estabs/food-review", element: <ReviewsEstab /> },
  { path: "/estabs/food-review/add-review", element: <AddReview /> },
  //FOOD ITEMS OF ESTAB
  { path: '/estabs/food', element: <EstabFood />},
  { path: '/estabs/food-type', element: <FoodType />},

  //REVIEWS OF FOOD ITEM UNDER ESTAB
  { path: "/estabs/food/food-review", element: <ReviewsFood /> },
  { path: "/estabs/food/food-review/add-review", element: <AddReview /> },

  // //REVIEWS OF FOOD ITEM UNDER ESTAB
  // { path: '/estabs/food/food-review/monthly', element: <ReviewsFoodMonth />},
  // { path: '/foods/order-price', element: <EstabFood />},
  // { path: '/food', element: <EstabFood />},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
