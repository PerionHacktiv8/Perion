// src/app/config/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDOLinbEnWVhL0i3OHEo6oZp7PyLeEWdKk",
    authDomain: "final-projext-1d9c3.firebaseapp.com",
    projectId: "final-projext-1d9c3",
    storageBucket: "final-projext-1d9c3.appspot.com",
    messagingSenderId: "424862914904",
    appId: "1:424862914904:web:6265af26b33e5df47aed2d"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };