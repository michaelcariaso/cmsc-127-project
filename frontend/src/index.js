import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';  

import Root from './pages/root.js';




import Establishments from './pages/view-establishments';

const router = createBrowserRouter([
  { path: '/', element: <Root />, children:[
    //LOGIN/SIGNUP
    { path: '/', element: <LogIn/>},
    { path: '/sign-up', element: <SignUp/>},
    //MENU
    { path: '/estabs', element: <Establishments/>},
  ] }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
