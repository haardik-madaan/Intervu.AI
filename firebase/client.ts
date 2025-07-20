import {initializeApp, getApp, getApps} from "firebase/app"
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyDpqYb7A74Lmoje_DJe5sTxFqQyf5mdIlQ",
  authDomain: "intervuai-ce978.firebaseapp.com",
  projectId: "intervuai-ce978",
  storageBucket: "intervuai-ce978.firebasestorage.app",
  messagingSenderId: "572496361677",
  appId: "1:572496361677:web:a71991ce8d3d4ca94e1184",
  measurementId: "G-4CK4FZLR15"
};

// Initialize Firebase
const app = !getApps.length ?  initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(app);
export const db = getFirestore(app);
