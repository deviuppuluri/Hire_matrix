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
const postajobForm = document.getElementById('postajobForm');

// Add event listener to the form submission
postajobForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get the values from the form
    const Company_name = document.getElementById("company-name").value;
    const Job_title = document.getElementById("job-title").value;
    const Tags = document.getElementById("tags").value;
    const Job_role = document.getElementById("job-role").value;
    const Min_salary = document.getElementById("min-salary").value;
    const Max_salary = document.getElementById("max-salary").value;
    const Vacancies = document.getElementById("vacancies").value;
    const Job_level = document.getElementById("job-level").value;
    const Eligibility = document.getElementById("Eligibility").value;
    const Passout = document.getElementById("Passout").value;
    const Job_type = document.getElementById("job_type").value;
    const Experience = document.getElementById("Experience").value;
    const Country = document.getElementById("country").value;
    const City = document.getElementById("city").value;
    const Job_description= document.getElementById("job-description").value;
    
    try {
        // Save the contact data to Firestore
        await addDoc(collection(db, "postajobData"), {
            Company_name,
            Job_title,
            Tags,
            Job_role,
            Min_salary,
            Max_salary,
            Vacancies,
            Job_level,
            Eligibility,
            Passout,
            Job_type,
            Experience,
            Country,
            City,
            Job_description,
            timestamp: new Date() // You can store the timestamp of when the message was sent
        });

        // Display a success message or alert
        alert("Your post has successfully sent to the admins!");

        // Clear the form
        postajobForm.reset();
    } catch (error) {
        // Handle any errors
        alert("Error: " + error.message);
    }
});










