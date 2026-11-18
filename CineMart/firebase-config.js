import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDf-jVEAazNDq2ulHfw8dihDT4oj6nxrs8",
    authDomain: "cinemart-d9f05.firebaseapp.com",
    projectId: "cinemart-d9f05",
    storageBucket: "cinemart-d9f05.firebasestorage.app",
    messagingSenderId: "246080670394",
    appId: "1:246080670394:web:4c7623b0f4b47c87dad083"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

console.log("CineMart Firebase initialized successfully.");