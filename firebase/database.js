import { db } from "./firebase-config.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Function to add event
async function addEvent(title, date, color) {
    try {
        await addDoc(collection(db, "events"), {
            title: title,
            start: date,
            color: color
        });
        console.log("Event added successfully!");
    } catch (error) {
        console.error("Error adding event: ", error);
    }
}

// Function to fetch events
async function getEvents() {
    const events = [];
    const querySnapshot = await getDocs(collection(db, "events"));
    querySnapshot.forEach((doc) => {
        events.push({ id: doc.id, ...doc.data() });
    });
    return events;
}

export { addEvent, getEvents };
