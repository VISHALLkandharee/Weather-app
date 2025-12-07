// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDegSP1fViYQpJDT364U8mK782BwBjv7H0",
  authDomain: "react-app-679ff.firebaseapp.com",
  projectId: "react-app-679ff",
  storageBucket: "react-app-679ff.firebasestorage.app",
  messagingSenderId: "746130427513",
  appId: "1:746130427513:web:6152ffc40e92183cf80ea8",
  measurementId: "G-Y3QQKE1LXY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 