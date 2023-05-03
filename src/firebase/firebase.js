import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnR4orpwds6xda5AryB6bJGx80k43Zkjk",
  authDomain: "moviehub-reactproject.firebaseapp.com",
  projectId: "moviehub-reactproject",
  storageBucket: "moviehub-reactproject.appspot.com",
  messagingSenderId: "286227882418",
  appId: "1:286227882418:web:2a510c0a0174177a2444ab"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "Movies");
export const reviewRef = collection(db, "Reviews");
export const userRef = collection(db, "Users");


export default app;