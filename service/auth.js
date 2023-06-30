import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithCredential,
  updateProfile,
  signOut,
} from "firebase/auth";
import { getApp } from "./firebase";
import { useErrorMsg } from "../config/errorMsg";
import { storeData } from "../store/async-storage";

const app = getApp();
const auth = getAuth(app);

export const postCreateUserByEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user, _tokenResponse: credential } = userCredential;
    storeData("credential", credential);
    return { data: { user, credential } };
  } catch (error) {
    console.log(error);
    return { errorCode: error.code, errorMsg: useErrorMsg(error.code) };
  }
};

export const postLoginByEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user, _tokenResponse: credential } = userCredential;
    storeData("credential", credential);
    return { data: { user, credential } };
  } catch (error) {
    console.log(error);
    return { errorCode: error.code, errorMsg: useErrorMsg(error.code) };
  }
};

export const postLoginByCredential = async () => {
  try {
    const userCredential = await signInWithCredential();
    const { user, _tokenResponse: credential } = userCredential;
    storeData("credential", credential);
    return { data: { user, credential } };
  } catch (error) {
    console.log(error);
    return { errorCode: error.code, errorMsg: useErrorMsg(error.code) };
  }
};

const putUserProfile = async (userInfo) => {
  try {
    await updateProfile(auth.currentUser, {
      displayName: userInfo.displayName,
      // photoURL: "https://example.com/jane-q-user/profile.jpg",
    });
    return {};
  } catch (error) {
    console.log(error);
    return { errorCode: error.code, errorMsg: useErrorMsg(error.code) };
  }
};

const postSignOut = async () => {
  try {
    await signOut(auth);
    return {};
  } catch (error) {
    console.log(error);
    return { errorCode: error.code, errorMsg: useErrorMsg(error.code) };
  }
};

export default {
  postLoginByEmail,
  postLoginByCredential,
  putUserProfile,
  postSignOut,
};
