import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvRITR5q5arX_MHslXkY6Q6iMXAT2BBHk",
  authDomain: "blink-chat-6c838.firebaseapp.com",
  projectId: "blink-chat-6c838",
  storageBucket: "blink-chat-6c838.appspot.com",
  messagingSenderId: "867426366565",
  appId: "1:867426366565:web:c89137873946180628028c",
};

const app = initializeApp(firebaseConfig);
// Initialized All 3 Services
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
