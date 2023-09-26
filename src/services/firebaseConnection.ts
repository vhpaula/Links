import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBuRSZBzYpBsP3-yRoSiQnhmujrgskkhpA",
    authDomain: "reactlinks-ab0a2.firebaseapp.com",
    projectId: "reactlinks-ab0a2",
    storageBucket: "reactlinks-ab0a2.appspot.com",
    messagingSenderId: "930787199318",
    appId: "1:930787199318:web:1e78f84062023cfb9feef7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
