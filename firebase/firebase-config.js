// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAExRnlQu3WEd41hd44VyvmkQAAY4Uon0E",
    authDomain: "ncw-events-organizer.firebaseapp.com",
    projectId: "ncw-events-organizer",
    storageBucket: "ncw-events-organizer.appspot.com",
    messagingSenderId: "881699396168",
    appId: "1:881699396168:web:b0e933daa7856554e6167d"
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Export Firebase services
export {
    app,
    auth,
    db,
    signInWithEmailAndPassword,
    signOut,
    collection,
    addDoc,
    getDocs,
    doc,
    setDoc,
    updateDoc,
    deleteDoc
};
