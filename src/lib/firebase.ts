import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAhSEyx1zorXXAliUKq9Ch_YCMu284ZVJI",
    authDomain: "heptact.firebaseapp.com",
    projectId: "heptact",
    storageBucket: "heptact.firebasestorage.app",
    messagingSenderId: "693485393332",
    appId: "1:693485393332:web:db0a38c796977ed065cee1",
    measurementId: "G-YCGZ9P2TBB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (only in browser)
export const initAnalytics = async () => {
    if (await isSupported()) {
        return getAnalytics(app);
    }
    return null;
};

export default app;
