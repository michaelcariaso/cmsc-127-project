import React, {useState} from "react";
// import { useNavigate } from "react-router-dom";
import "../css/login.css"

const SignUp = () => {
    const [fname, setFname] = useState();
    const [mname, setMname] = useState();
    const [lname, setLname] = useState();
    const [email, setEmail] = useState();
    const [pword, setPassword] = useState();
    const [confirmPass, setConfirmPass] = useState();

    // let navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
    }

    return (
        <div class = "login-container">
            <div class = "login-box">
                <div>
                    <h1>SIGN UP</h1>
                </div>

                <div class = "login-input">
                    <form id="signup-form" class="signup" onSubmit={handleSignup}>
                        <input type="text" id="fname" placeholder="First Name*" required onChange={(e) => setFname(e.target.value)}/>
                        <input type="text" id="mname" placeholder="Middle Name (optional)" onChange={(e) => setMname(e.target.value)}/>
                        <input type="text" id="lname" placeholder="Last Name*" required onChange={(e) => setLname(e.target.value)}/>
                        <input type="email" id="email" placeholder="User Email*" required onChange={(e) => setEmail(e.target.value)}/>
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
        
    );
};
 
export default SignUp;