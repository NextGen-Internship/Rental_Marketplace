import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = React.createContext({
  isLoggedIn: false,
  token: "",
  userId: "",
  email: "",
  picture: null,
  login: (token) => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    token: "",
    userId: "",
    email: "",
    picture: null,
  });

  const login = (token) => {
    const decoded = jwtDecode(token);

    setAuthState({
      isLoggedIn: true,
      token: localStorage.getItem("token"),
      userId: decoded.jti,
      picture: decoded.picture,
      email: decoded.email,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({
      isLoggedIn: false,
      token: "",
      userId: "",
      email: "",
      picture: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
