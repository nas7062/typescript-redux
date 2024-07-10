
import { initializeApp } from "firebase/app";
import { getFirestore ,Firestore} from "firebase/firestore";

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
const db: Firestore = getFirestore(app); // Firestore 타입 명시

export { db };

