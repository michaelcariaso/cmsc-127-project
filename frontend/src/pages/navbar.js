import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css'

const Navbar = ({ children }) => {
  return (
    <div className="navbar">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/sign-up">Sign Up</Link></li>
          <li><Link to="/estabs">Establishments</Link></li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
      {/* Render the child components (router content) */}
      {children}
    </div>
  );
}

export default Navbar;
