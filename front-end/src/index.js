import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "bootstrap/dist/css/bootstrap.css";
import { AuthContextProvider } from "../src/contexts/AuthContext"; // Adjust the path accordingly

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <GoogleOAuthProvider clientId="1022611064919-anjhq49aic100ll017uci89hnctoqf6g.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
