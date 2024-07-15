
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAzlfKEYpA359S7sxnZ2Y6anGA2TFB2GrA",
  authDomain: "typereudx.firebaseapp.com",
  projectId: "typereudx",
  storageBucket: "typereudx.appspot.com",
  messagingSenderId: "554438848427",
  appId: "1:554438848427:web:27b5203eaab58e0b76acee",
  measurementId: "G-F0M0SKWBWG"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Firestore 타입 명시
export const storage = getStorage(app);
export const auth = getAuth();
