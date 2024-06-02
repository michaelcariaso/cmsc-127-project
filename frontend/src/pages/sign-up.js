import React, {useState} from "react";
// import { useNavigate } from "react-router-dom";
import "../css/login.css"

import Navbar from "./navbar.js";

const SignUp = () => {
    const [uname, setUname] = useState();
    const [mname, setName] = useState();
    const [age, setAge] = useState();
    const [pword, setPassword] = useState();
    const [confirmPass, setConfirmPass] = useState();

    // let navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <Navbar />
            <div class = "login-container">
                <div class = "login-box">
                    <div>
                        <h1>SIGN UP</h1>
                    </div>

                    <div class = "login-input">
                        <form id="signup-form" class="signup" onSubmit={handleSignup}>
                            <input type="text" id="uname" placeholder="Username*" required onChange={(e) => setUname(e.target.value)}/>
                            <input type="text" id="lname" placeholder="Display Name*" required onChange={(e) => setName(e.target.value)}/>
                            <input type="number" id="lname" placeholder="Display Name*" required onChange={(e) => setAge(e.target.value)}/>
                            <input type="password" id="pword" placeholder="Password*" required onChange={(e) => setPassword(e.target.value)}/>
                            <input type="password" id="confirmPass" placeholder="Confirm Password*" required onChange={(e) => setConfirmPass(e.target.value)}/>
                            <button type="submit" id= "loginBtn" >CREATE ACCOUNT</button>
                        </form>
                        <div>
                            <p>Already have an account?</p>
                            <a href='/'>Log in instead</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    );
};
 
export default SignUp;