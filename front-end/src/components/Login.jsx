import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
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
    <div className="app">
      <div className="login">
        <h1>Sign in</h1>

        <form className="form">
          <label>
            Email
            <input type="text" />
          </label>

          <label>
            Password
            <input type="text" />
          </label>
        </form>

        <button>Submit</button>

        <GoogleLogin
          onSuccess={handleGoogleLogin}
          clientId="1022611064919-anjhq49aic100ll017uci89hnctoqf6g.apps.googleusercontent.com"
        />
      </div>
    </div>
  );
}

export default Login;
