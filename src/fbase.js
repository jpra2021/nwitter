// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHODOMAIN,
  projectId: process.env.REACT_APP_AUTHODOMAIN,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};

// (1)Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
//for first checking in index console.log, and it will not be used again but ....? -> it will be used in getAuth
//-export default app; (first)

//v9
export const authService = getAuth(firebaseApp);
