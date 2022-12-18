import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYLpNRLBXLZwX3ZTVfJP4ZqXxJ6aL5ztM",
  authDomain: "eciglogistica-5b6f0.firebaseapp.com",
  projectId: "eciglogistica-5b6f0",
  storageBucket: "eciglogistica-5b6f0.appspot.com",
  messagingSenderId: "1000888561787",
  appId: "1:1000888561787:web:45429dfc69c306811c72de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);