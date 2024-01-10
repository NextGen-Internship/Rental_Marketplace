import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

function Login2() {
  const handleGoogleLogin = async (response) => {
    // console.log(response.credential);

    const jwt = response.credential;
    localStorage.setItem("jwt token", jwt);

    try {
      const backendResponse = await axios.post(
        "http://localhost:8080/rentify/google-login",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": jwt
          },
          body: "",
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
}

export default Login2;
