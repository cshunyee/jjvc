import { createContext, useReducer, useState, AsyncStorage } from "react";
import { Alert } from "react-native";

export const AuthContext = createContext({
  isLoggedIn: false,
  token: "",
  username: "",
  login: () => true,
});

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [username, setUsername] = useState();

  const authenticateUser = (username, password) => {
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

  const value = {
    isLoggedIn: !!token,
    token: token,
    username: username,
    login: loginHandler,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
