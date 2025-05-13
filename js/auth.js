import { auth } from "../firebase/firebase-config.js";
import { signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// User Login
async function loginUser(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
        window.location.href = "home.html";
    } catch (error) {
        alert("Login failed: " + error.message);
    }
}

// User Logout
function logoutUser() {
    signOut(auth).then(() => {
        alert("Logged out successfully!");
        window.location.href = "index.html";
    });
}

export { loginUser, logoutUser };
