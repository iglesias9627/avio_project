import admin from 'firebase-admin';
import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import serviceAccount from '../firebase-json/service-account-key.json' with { type: 'json' }; 

dotenv.config();

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Initialize Firebase Client SDK (for authentication)
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export { admin };
