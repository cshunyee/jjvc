// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZhg5keu0308eBUF0NCX0b00DtQln39x0",
  authDomain: "jjvc-7665d.firebaseapp.com",
  databaseURL: "https://jjvc-7665d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "jjvc-7665d",
  storageBucket: "jjvc-7665d.appspot.com",
  messagingSenderId: "56388461276",
  appId: "1:56388461276:web:5044444270212396530a19",
  measurementId: "G-XBCC38VL4P"
};

// Initialize Firebase
export const getApp = () => {
  return initializeApp(firebaseConfig);
}
// export const analytics = getAnalytics(app);
// export * from "./auth";