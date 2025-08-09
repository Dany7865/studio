// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "edumateai-ddk6f",
  "appId": "1:423761233869:web:87e8f15d27d04d08dea684",
  "storageBucket": "edumateai-ddk6f.firebasestorage.app",
  "apiKey": "AIzaSyDe-b_FI51wirJGFbOXlXvELeBusT340UA",
  "authDomain": "edumateai-ddk6f.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "423761233869"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
