import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithCredential,
} from "firebase/auth";
import { getApp } from "./firebase";
import { useErrorMsg } from "../config/errorMsg";
import { storeData } from "../store/async-storage";

const app = getApp();
const auth = getAuth(app);

export const postLoginByEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user, credential } = userCredential;
    storeData("credential", credential)
    return { data: { user, credential } };
  } catch (error) {
    console.log(error);
    return { errorCode: error.code, errorMsg: useErrorMsg(error.code) };
  }
};

export const postLoginByCredential = async () => {
  const response = {};
  try {
    const userCredential = await signInWithCredential();
  } catch (error) {
    const errorResponse = {
      ...response,
      errorCode: error.code,
      errorMsg: useErrorMsg(error.code),
    };
    return errorResponse;
  }
};

export default {
  postLoginByEmail,
};
