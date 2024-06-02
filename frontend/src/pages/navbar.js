import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';

const Navbar = () => {
  return (
    <>
        <div className="navbar">
            <div className="navtitle">
                <h1>Where2Eat</h1>
            </div>
            <nav>
                <ul>
                <li><Link to="/">Log In</Link></li>
                <li><Link to="/sign-up">Sign Up</Link></li>
                <li><Link to="/estabs">Establishments</Link></li>
                </ul>
            </nav>
        </div>
    </>
  );
}

export default Navbar;
