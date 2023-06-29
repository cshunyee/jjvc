import { createContext, useReducer, useState, AsyncStorage } from "react";
import { Alert } from "react-native";
import authService from "../service/auth.js";

const initData = {
  user: {},
  isLoggedIn: false,
  token: "",
  login: () => true,
  logout: () => true,
  updateUser: () => true,
};

export const AuthContext = createContext(initData);

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [userInfo, setUserInfo] = useState({});

  const loginHandler = async (email, password) => {
    if (!email || !password) return false;

    const response = await authService.postLoginByEmail(email, password);
    if (response.errorMsg) {
      Alert.alert(response.errorMsg);
      return false;
    }

    const { user, credential } = response.data;
    setUserInfo(user);
    setToken(credential.idToken);
    return true;
  };

  const logoutHandler = async () => {
    const response = await authService.postSignOut();
    if (response.errorMsg) {
      Alert.alert(response.errorMsg);
      return false;
    }
    setUserInfo({});
    setToken("");
    return true;
  };

  const updateUserHandler = async (userInfo) => {
    const response = await authService.putUserProfile(userInfo);
    if (response.errorMsg) {
      Alert.alert(response.errorMsg);
      return false;
    }
    return true;
  };

  const value = {
    user: userInfo,
    isLoggedIn: !!token,
    token: token,
    login: loginHandler,
    logout: logoutHandler,
    updateUser: updateUserHandler,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
