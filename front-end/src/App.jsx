import "./App.css";
import Hello from "./components/Hello";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

function App() {
  const GoogleLoginButton = () => {
    const handleGoogleLogin = async (response) => {
      console.log("Google login response:", response.credential);

      const jwt = response.credential;
      localStorage.setItem("jwt token", jwt);

      try {
        const backendResponse = await axios.post(
          "http://localhost:8080/rentify/google-login",
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(jwt),
          }
        );
      } catch (error) {
        console.error("Error sending user data to backend:", error);
      }
    };

    return (
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        clientId="1022611064919-anjhq49aic100ll017uci89hnctoqf6g.apps.googleusercontent.com"
        render={(renderProps) => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            Login with Google
          </button>
        )}
      />
    );
  };

  //export default GoogleLoginButton;

  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* <Hello /> */}
      </div>
    </Router>
  );
}

export default App;
