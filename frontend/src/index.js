import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';  

import LogIn from './pages/log-in.js';
import SignUp from './pages/sign-up.js';

import Establishments from './pages/view-establishments';
import ReviewsEstab from './pages/estab-review.js';
import EstabFood from './pages/view-food.js';

const router = createBrowserRouter([
  //LOGIN/SIGNUP
  { path: '/', element: <LogIn/>},
  { path: '/sign-up', element: <SignUp/>},
  //MENU
  { path: '/estabs', element: <Establishments/>},
  { path: '/estabs/food-review', element: <ReviewsEstab />},
  { path: '/estabs/food', element: <EstabFood />}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
