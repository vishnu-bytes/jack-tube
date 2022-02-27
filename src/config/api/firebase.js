// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import  "firebase/compat/auth"
import  "firebase/compat/database"

const firebaseConfig = {
  apiKey: "AIzaSyBA3B0vjmR4RiBOFQVthEVTbv4C-lE7zOA",
  authDomain: "utube-9a60a.firebaseapp.com",
  databaseURL: "https://utube-9a60a-default-rtdb.firebaseio.com",
  projectId: "utube-9a60a",
  storageBucket: "utube-9a60a.appspot.com",
  messagingSenderId: "987633966141",
  appId: "1:987633966141:web:07e81df25f78367faade54",
  measurementId: "G-M5K1WC9858"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase ;
