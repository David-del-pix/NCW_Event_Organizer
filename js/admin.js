// admin.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAExRnlQu3WEd41hd44VyvmkQAAY4Uon0E",
    authDomain: "ncw-events-organizer.firebaseapp.com",
    projectId: "ncw-events-organizer",
    storageBucket: "ncw-events-organizer.appspot.com",  // Fixed Typo
    messagingSenderId: "881699396168",
    appId: "1:881699396168:web:b0e933daa7856554e6167d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Add event function
const addEvent = async () => {
    const eventTitle = document.getElementById('eventTitle').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventVenue = document.getElementById('eventVenue').value;
    const eventCompetitions = document.getElementById('eventCompetitions').value;
    const eventPrizes = document.getElementById('eventPrizes').value;
    const eventOrganizers = document.getElementById('eventOrganizers').value;

    if (!eventTitle || !eventDate || !eventVenue || !eventCompetitions || !eventPrizes || !eventOrganizers) {
        alert('Please fill in all the event details!');
        return;
    }

    try {
        const docRef = await addDoc(collection(db, 'events'), {
            title: eventTitle,
            date: eventDate,
            venue: eventVenue,
            competitions: eventCompetitions,
            prizes: eventPrizes,
            organizers: eventOrganizers,
        });

        console.log("Event added with ID: ", docRef.id);
        alert('Event added successfully!');
        document.getElementById('addEventForm').reset();

    } catch (e) {
        console.error("Error adding event: ", e);
        alert('There was an error adding the event. Please try again.');
    }
};

// Add event on form submission
document.getElementById('addEventForm').addEventListener('submit', (e) => {
    e.preventDefault();
    addEvent();
});

// Logout Function
const logoutUser = () => {
    signOut(auth)
        .then(() => {
            console.log("User logged out successfully");
            window.location.href = "home.html";
        })
        .catch((error) => {
            console.error("Error logging out: ", error);
            alert("Logout failed! Try again.");
        });
};

// Attach event listener to logout button
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', logoutUser);
} else {
    console.error("Logout button not found in the DOM");
}
