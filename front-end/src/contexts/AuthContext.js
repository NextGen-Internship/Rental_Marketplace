import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = React.createContext({
  isLoggedIn: false,
  token: "",
  userId: "",
  email: "",
  picture: "",
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [email, setEmail] = useState();
  const [picture, setPicture] = useState();

  const loginHandler = (response) => {
    const decodedToken = jwtDecode(response.accessToken);

    setIsLoggedIn(true);
    setToken(response.accessToken);
    setUserId(decodedToken.userId);
    setEmail(decodedToken.email);
    setPicture(decodedToken.picture);
  };

  const logoutHandler = async () => {
    setIsLoggedIn(false);
    setToken(null);
    setUserId(null);
    setEmail(null);
    setPicture(null);
  };

  const contextValue = {
    isLoggedIn: isLoggedIn,
    token: token,
    userId: userId,
    email: email,
    picture: picture,
    login: loginHandler,
    logout: logoutHandler,
  };

  useEffect(() => {
    let tokenLocal = localStorage.getItem("token");

    if (tokenLocal && !token) {
      const data = { accessToken: tokenLocal };
      loginHandler(data);
    }

    // if (token) {
    //   // Perform any token expiration checks or refresh logic here
    // }
  }, [token]);

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
