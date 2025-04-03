
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {
  apiKey: "AIzaSyCJJjCYpX-XqeNKd6_oG4ChwwVrFn0Emcw",
  authDomain: "prepwise-dcf74.firebaseapp.com",
  projectId: "prepwise-dcf74",
  storageBucket: "prepwise-dcf74.firebasestorage.app",
  messagingSenderId: "735377819125",
  appId: "1:735377819125:web:a4712e3927c8952c47ccbc"
};


const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();


export const auth = getAuth(app);
export const db = getFirestore(app);
