import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../css/login.css'
import { userState } from '../index.js';
import Navbar from "./navbar.js";

const LogIn = () => {
    const [username, setUsername] = useState();
    const [pword, setPassword] = useState();

    let navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`http://localhost:4000/user/search?username=${username}`);

            const result = await response.json();
            if (result.length > 0) { //if username exists in db
                userState.currentUser = username;
                console.log(userState.currentUser);
                navigate('/estabs');
            } else {
                alert("Invalid user");
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    return (
        <>
        <Navbar/>
        <div class="login-container">
            <div class="login-welcome">
                <img src ="https://static.rappler.com/images/20130910-philippine-rice-01.jpg" alt="logo.jpg"></img>
            </div>
            <div class = "login-box">
                <div>
                    <h1>LOG IN</h1>
                </div>

                <div class="login-input">
                    <form class= "login" id="login-form" onSubmit={handleLogin}>
                        <input type="text" id="email" placeholder="Email" required onChange={(e) => setUsername(e.target.value)}/>
                        <input type="password" id="pword" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        <button type="submit" id= "loginBtn">LOG IN</button>
                    </form>
                    
            
                    <div>
                        <p>Don't have an account yet?</p>
                        <a href="/sign-up">SIGN UP HERE</a>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};
 
export default LogIn;