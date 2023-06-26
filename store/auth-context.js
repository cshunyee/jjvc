import { createContext, useReducer, useState, AsyncStorage } from "react";
import { Alert } from "react-native";
import authService from "../service/auth.js";

const initData = {
  isLoggedIn: false,
  token: "",
  username: "",
  login: () => true,
  logout: () => true
}

export const AuthContext = createContext(initData);

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [username, setUsername] = useState();

  const loginHandler = async (email, password) => {
    if (!email || !password) return false;

    const response = await authService.postLoginByEmail(email, password);
    if (response.errorMsg) {
      Alert.alert(response.errorMsg);
      return false;
    };

    console.log(response)

    // setUsername("cshunyee");
    // setToken("testingUser");
    return false;
  };

  const logoutHandler = async () => {
    setUsername("");
    setToken("");
  }

  const value = {
    isLoggedIn: !!token,
    token: token,
    username: username,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
