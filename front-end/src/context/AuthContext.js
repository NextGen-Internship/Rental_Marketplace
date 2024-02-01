import React, { useState, useEffect, useLayoutEffect } from "react";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [email, setEmail] = useState();
  const [picture, setPicture] = useState();
  // let isLoggedIn = false;
  // let token = ''
  // let userId = 0;
  // let email = 
  // const [picture, setPicture] = useState();

  const loginHandler = (token) => {
    console.log( "token login h" + token);
    const decodedToken = jwtDecode(token);
    console.log(decodedToken)

    console.log("login handler");

    setIsLoggedIn(true);
    console.log(isLoggedIn)
    setToken(localStorage.getItem("token"));
    setUserId(decodedToken.jti);
    setEmail(decodedToken.sub);
    setPicture(decodedToken.picture);
  };

  const logoutHandler = async () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setToken(null);
    setUserId(null);
    setEmail(null);
    setPicture(null);
    //console.log("logouutttt")
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
    //debugger;
    const tokenLocal = localStorage.getItem("token");
    //console.log( "token " + tokenLocal)

    if (tokenLocal !== '') { // && !token
      loginHandler(tokenLocal);
    } else {
      logoutHandler();
    }

    console.log("useeffect auth context");
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
