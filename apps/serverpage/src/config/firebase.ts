require("dotenv").config();

// Import the necessary functions from Firebase SDK
import { getApps, initializeApp } from "firebase/app"; // Modular import
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import admin, { ServiceAccount } from "firebase-admin";
import serviceAccount from "../config/firebaseService.json";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Add this line to debug
// console.log('Firebase Config:', firebaseConfig);

// Initialize Firebase app
const firebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig); 
const auth = getAuth(firebaseApp);
// Initialize app in Firebase v9+

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

// Export necessary Firebase and Firebase Admin methods
export { auth, signInWithEmailAndPassword, sendPasswordResetEmail, getAuth, createUserWithEmailAndPassword, signOut, sendEmailVerification, admin };
