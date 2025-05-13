import { db, collection, getDocs } from "../firebase/firebase-config.js";

// Fetch event ID from URL
const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('event');

// Reference Firestore events collection
const eventsRef = collection(db, "events");

// Fetch event details from Firestore
async function fetchEventDetails() {
    const querySnapshot = await getDocs(eventsRef);
    let eventFound = false;

    querySnapshot.forEach((doc) => {
        const event = doc.data();

        if (doc.id === eventId) {
            eventFound = true;

            document.getElementById('event-details-container').innerHTML = `
                <div class="event-header">
                    <h2>${event.title} <i class="fas fa-calendar"></i></h2>
                    <p class="date-time"><i class="fas fa-calendar-alt"></i> ${event.date} | <i class="fas fa-clock"></i> ${event.time}</p>
                    <p class="venue"><i class="fas fa-map-marker-alt"></i> ${event.venue}</p>
                </div>

                <div class="event-content">
                    <div class="event-image">
                        <img src="${event.posterUrl}" alt="${event.title}">
                    </div>
                    <div class="event-description">
                        <h3>About the Event</h3>
                        <p>${event.about}</p>
                        <ul>
                            ${event.highlights.map(highlight => `<li><i class="fas fa-check-circle"></i> ${highlight}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                <div class="event-organizers">
                    <h3>Organized By</h3>
                    <ul>
                        ${event.organizers.map(org => `<li><i class="fas fa-user"></i> ${org}</li>`).join('')}
                    </ul>
                </div>

                <div class="event-prizes">
                    <h3>Prizes for Winners</h3>
                    <p>${event.prizes}</p>
                </div>

                <a href="register.html?event=${doc.id}" class="register-btn"><i class="fas fa-user-edit"></i> Register Now</a>
            `;
        }
    });

    if (!eventFound) {
        document.getElementById('event-details-container').innerHTML = `
            <p style="text-align:center; font-size: 20px; color: red;">Event not found!</p>
        `;
    }
}

// Run function to load event details
fetchEventDetails();
