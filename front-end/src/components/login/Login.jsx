import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/rentify/login", {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      console.log("Login successful:", response.data);

      navigate("/");
    } catch (error) {
      
        setErrorMessage("Email or Password are incorrect");
        console.error("Login failed:", error);
      
    }
  };

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

        <form className="form" onSubmit={handleSubmit}>
          <label>
            Email
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Password
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit"> Submit</button>

          <div className="login-password-btn">
          <button
            type="button"
            className="toggle-password-button"
            onClick={handleTogglePassword}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
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
