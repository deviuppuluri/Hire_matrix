// Import the necessary Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

// Your Firebase config - replace these with your actual Firebase credentials
const firebaseConfig = {
    apiKey: "AIzaSyDXm_lnJc3R36WAB7wCTrj-qbdjfsSyI6g",
    authDomain: "job-4aef7.firebaseapp.com",
    projectId: "job-4aef7",
    storageBucket: "job-4aef7.firebasestorage.app",
    messagingSenderId: "87979659611",
    appId: "1:87979659611:web:cd366f1ca9c43f5d108a7e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get the contact form
const helpForm = document.getElementById('helpForm');

// Add event listener to the form submission
helpForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get the values from the form
    const Name = document.getElementById("name").value;
    const Email = document.getElementById("email").value;
    const Message = document.getElementById("message").value;


    try {
        // Save the contact data to Firestore
        await addDoc(collection(db, "HelpMessages"), {
            Name,
            Email,
            Message,
            timestamp: new Date() // You can store the timestamp of when the message was sent
        });

        // Display a success message or alert
        alert("Thank you for your feedback!");

        // Clear the form
        helpForm.reset();
    } catch (error) {
        // Handle any errors
        alert("Error: " + error.message);
    }
});










