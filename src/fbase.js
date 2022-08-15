// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// (1)Initialize Firebase
const App = initializeApp(firebaseConfig);
//for first checking in index console.log, and it will not be used again but ....? -> it will be used in getAuth
//-export default app; (first)

//v9
//export const authService = getAuth(firebaseApp);
export const authService = getAuth();
export const dbService = getFirestore();
export const storageSerivce = getStorage();
