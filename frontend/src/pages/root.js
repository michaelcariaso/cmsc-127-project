import React, { useState, useEffect } from "react";
import { Nav, NavLink, NavMenu } from "../css/NavbarElements";
import { Outlet } from  'react-router-dom';
import '../css/footer.css'
 
const Root = () => {
    return (
        <>
            <Nav>
                <h1 className='nav-logo'>FOOD REVIEW</h1>
                <img src='https://upload.wikimedia.org/wikipedia/commons/e/e9/Department_of_Agriculture_of_the_Philippines.svg' alt="logo.jpg"/>
                <NavMenu>
                    <NavLink to="/estabs" activeStyle>
                        View Establishments
                    </NavLink>
                    <NavLink to="/log-in" activeStyle>
                        Log In
                    </NavLink>
                    <NavLink to="/sign-up" activeStyle>
                        Sign Up
                    </NavLink>
                </NavMenu>
            </Nav>
            <Outlet/>
        </>
    );
};
 
export default Root;