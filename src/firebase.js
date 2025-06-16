// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Import auth and GoogleAuthProvider

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCyL8lGWQbpvXJRmfllOGI6mpRLZcvZfx8", // Your actual API key
    authDomain: "free-lunch-eligibility-check.firebaseapp.com",
    projectId: "free-lunch-eligibility-check",
    storageBucket: "free-lunch-eligibility-check.firebasestorage.app",// Corrected from your pasted config
    messagingSenderId: "608414230981",
    appId: "1:608414230981:web:c218b263be953df8ea03ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(); // Create a Google Auth Provider instance

export { auth, googleProvider };