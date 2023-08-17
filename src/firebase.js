import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCBi8rB_etntZzDXw6sMfPl13R9xADUBXc",

  authDomain: "quickchat-e4221.firebaseapp.com",

  projectId: "quickchat-e4221",

  storageBucket: "quickchat-e4221.appspot.com",

  messagingSenderId: "191874451087",

  appId: "1:191874451087:web:2dc8692dd78848fb7c92fa"

};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
