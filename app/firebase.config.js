// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Firestore, getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBd1ou7rfQLKBs9GBGAiMjiPbKufX_y9iE",
  authDomain: "starbucks-8ae18.firebaseapp.com",
  projectId: "starbucks-8ae18",
  storageBucket: "starbucks-8ae18.firebasestorage.app",
  messagingSenderId: "849060321954",
  appId: "1:849060321954:web:9acaaeb06a49624ed495fb",
  measurementId: "G-F8LM00DE60",
 

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db, app };