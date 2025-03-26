import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAHltc65Fv4RfhKGWFHJdGReKfmbJPSV8",
  authDomain: "questionnairesbuilder-61628.firebaseapp.com",
  projectId: "questionnairesbuilder-61628",
  storageBucket: "questionnairesbuilder-61628.firebasestorage.app",
  messagingSenderId: "1084293165769",
  appId: "1:1084293165769:web:640ca5952071502c8b5318",
  measurementId: "G-RVKKSSBN77",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
