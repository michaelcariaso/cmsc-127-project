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

const router = createBrowserRouter([
  //LOGIN/SIGNUP
  { path: "/", element: <LogIn /> },
  { path: "/sign-up", element: <SignUp /> },
  //MENU
  { path: "/estabs", element: <Establishments /> },
  { path: "/estabs/food-review", element: <ReviewsEstab /> },
  { path: "/estabs/food-review/add-review", element: <AddReview /> },
  { path: "/estabs/food", element: <EstabFood /> },
  { path: "/estabs/food/food-review", element: <ReviewsFood /> },
  { path: "/estabs/food/food-review/add-review", element: <AddReview /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
