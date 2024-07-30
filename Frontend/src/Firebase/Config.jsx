import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDhRYbcEJXE2dsObSw8zIvpjhTrCiM7UIs",
  authDomain: "yashbhaikicart.firebaseapp.com",
  projectId: "yashbhaikicart",
  storageBucket: "yashbhaikicart.appspot.com",
  messagingSenderId: "538124950189",
  appId: "1:538124950189:web:00cb4cb01afb00d2de0424",
  measurementId: "G-EFYSZ5X3HF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
