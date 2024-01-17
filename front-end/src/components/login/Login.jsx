import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import "./Login.css";
import { useState } from "react";
import { FreeBreakfast } from "@mui/icons-material";
import { json } from "react-router-dom";


function Login() {

    
    // const handeLogin = () => {
    //   const [email, setEmail] = useState('');
    //   const [password, setPassword] = useState('');
    
    //   const handleSubmit = async (e) => {
    //     e.preventDefault();
    
    //     try {
    //       const response = await axios.post('http://localhost:8080/api/auth/login', {
    //         email,
    //         password,
    //       });


    //       const { token } = response.data;
    //       localStorage.setItem('token', token);
    
    //       console.log(response.data); // Handle successful login
    //     } catch (error) {
    //       console.error('Login failed', error);
    //       // Handle login failure
    //     }
    //   };
    // }

     
  

  const handleGoogleLogin = async (response) => {
    const jwt = response.credential;
    console.log(response);
    localStorage.setItem("jwt token", jwt);

  

    try {
      const backendResponse = await axios.post(
        "http://localhost:8080/rentify/google-login",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: jwt,
          },
        }
      );
    } catch (error) {
      console.error("Error sending user data to backend:", error);
    }
  };




  return (
    <div className="login-container">
      <div className="login">
        <h1>Sign in</h1>

        <form className="form" >
          <label>
            Email
            <input type="text"  />
          </label>

          <label>
            Password
            <input type="text" />
          </label>
        
          <button type = "submit" > Submit</button>
        </form>

      

        <GoogleLogin
          onSuccess={handleGoogleLogin}
          clientId="1022611064919-anjhq49aic100ll017uci89hnctoqf6g.apps.googleusercontent.com"
        />
      </div>
    </div>
  );
}

export default Login;
