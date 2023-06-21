import { createContext, useReducer, useState, AsyncStorage } from "react";
import { Alert } from "react-native";

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

  const authenticateUser = (username, password) => {
    if (!username || !password) return false;
    return true;
  };

  const loginHandler = async (username, password) => {
    const isValidUser = authenticateUser(username, password);
    if (!isValidUser) {
      Alert.alert("Invalid User");
      return false;
    }

    setUsername(username);
    setToken("testingUser");
    // AsyncStorage.setItem("token", "testingUser");
    return true;
  };

  const logoutHandler = async () => {
    setUsername("");
    setToken("");
  }

  console.log(username, token)

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
