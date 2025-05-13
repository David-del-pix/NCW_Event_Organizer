// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAExRnlQu3WEd41hd44VyvmkQAAY4Uon0E",
    authDomain: "ncw-events-organizer.firebaseapp.com",
    projectId: "ncw-events-organizer",
    storageBucket: "ncw-events-organizer.appspot.com",  // Fixed Typo
    messagingSenderId: "881699396168",
    appId: "1:881699396168:web:b0e933daa7856554e6167d"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let currentDate = new Date();
const monthYear = document.getElementById("month-year");
const daysContainer = document.getElementById("calendar-days");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");

prevMonthBtn.addEventListener("click", () => changeMonth(-1));
nextMonthBtn.addEventListener("click", () => changeMonth(1));

function changeMonth(offset) {
    currentDate.setMonth(currentDate.getMonth() + offset);
    renderCalendar();
}

// Fetch events from Firestore for the current month and year
async function fetchEvents(year, month) {
    let events = {};
    try {
        const snapshot = await db.collection("events")
            .where("month", "==", month + 1) // Firestore uses 1-based month
            .where("year", "==", year)
            .get();

        snapshot.forEach(doc => {
            const data = doc.data();
            events[data.day] = data.title;
        });
    } catch (error) {
        console.error("Error fetching events:", error);
    }
    return events;
}

// Render the calendar with dates and events
async function renderCalendar() {
    daysContainer.innerHTML = "";
    
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    monthYear.innerText = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
    
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    
    const events = await fetchEvents(year, month);

    // Fill empty spaces for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement("div");
        emptyDiv.classList.add("empty");
        daysContainer.appendChild(emptyDiv);
    }

    // Generate calendar days
    for (let day = 1; day <= lastDate; day++) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("day");
        dayDiv.innerText = day;

        if (events[day]) {
            dayDiv.classList.add("event-day");
            dayDiv.innerHTML += `<br><small>${events[day]}</small>`;
        }

        daysContainer.appendChild(dayDiv);
    }
}

// Initial render
renderCalendar();
