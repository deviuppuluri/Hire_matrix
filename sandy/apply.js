import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Firebase Configuration
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

// Cloudinary configuration
const cloudinary_url = "https://api.cloudinary.com/v1_1/dffgyfhcw/upload";
const upload_preset = "online";

// Function to upload resume to Cloudinary
function uploadResume(file) {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', upload_preset); // Cloudinary upload preset

        fetch(cloudinary_url, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => resolve(data.url)) // returns the Cloudinary URL
        .catch(error => reject(error));
    });
}



    const dropArea = document.getElementById("drop-area");
    const fileInput = document.getElementById("resume");
    const fileInfo = document.getElementById("file-info");

    dropArea.addEventListener("click", () => fileInput.click());

    dropArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropArea.classList.add("hover");
    });

    dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("hover");
    });

    dropArea.addEventListener("drop", (e) => {
        e.preventDefault();
        dropArea.classList.remove("hover");
        const file = e.dataTransfer.files[0];

        if (file && file.type === "application/pdf") {
            fileInput.files = e.dataTransfer.files;
            fileInfo.innerHTML = `<i class="fas fa-check-circle"></i><p>${file.name} uploaded successfully</p>`;
            fileInfo.classList.remove("error");
            fileInfo.classList.add("success");
        } else {
            fileInfo.innerHTML = `<i class="fas fa-times-circle"></i><p>Please upload a PDF file</p>`;
            fileInfo.classList.add("error");
            fileInfo.classList.remove("success");
        }
    });

    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        if (file && file.type === "application/pdf") {
            fileInfo.innerHTML = `<i class="fas fa-check-circle"></i><p>${file.name} uploaded successfully</p>`;
            fileInfo.classList.remove("error");
            fileInfo.classList.add("success");
        } else {
            fileInfo.innerHTML = `<i class="fas fa-times-circle"></i><p>Please upload a PDF file</p>`;
            fileInfo.classList.add("error");
            fileInfo.classList.remove("success");
        }
    });


// Handle qualification selection change to toggle respective fields
document.getElementById('qualification').addEventListener('change', function() {
    const qualification = this.value;

    // Hide both fields initially
    document.getElementById('intermediate-fields').style.display = 'none';
    document.getElementById('diploma-fields').style.display = 'none';

    // Show the relevant fields based on the selection
    if (qualification === 'intermediate') {
        document.getElementById('intermediate-fields').style.display = 'block';
    } else if (qualification === 'diploma') {
        document.getElementById('diploma-fields').style.display = 'block';
    }
});

// Handle form submission
document.getElementById('application-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form submission

    // Get form data
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const resumeFile = document.getElementById("resume").files[0];
    const qualification = document.getElementById('qualification').value;
    let sscBoard = '';
    let sscYear = '';
    let sscCgpa = '';
    let intermediateBoard = '';
    let intermediateYear = '';
    let intermediatePercentage = '';
    let diplomaCollege = '';
    let diplomaYear = '';
    let diplomaPercentage = '';
    let undergraduateCollege = '';
    let undergraduateYear = '';
    let undergraduatePercentage = '';

    // Collect additional qualification details if applicable
    if (qualification === 'intermediate') {
        intermediateBoard = document.getElementById('intermediate-board').value;
        intermediateYear = document.getElementById('intermediate-year').value;
        intermediatePercentage = document.getElementById('intermediate-percentage').value;
    } else if (qualification === 'diploma') {
        diplomaCollege = document.getElementById('diploma-college').value;
        diplomaYear = document.getElementById('diploma-year').value;
        diplomaPercentage = document.getElementById('diploma-Percentage').value;
    }

    // Collect SSC and Undergraduate fields (separate sections)
    sscBoard = document.getElementById('ssc-board').value;
    sscYear = document.getElementById('ssc-year').value;
    sscCgpa = document.getElementById('ssc-cgpa').value;
    undergraduateCollege = document.getElementById('undergraduate-college').value;
    undergraduateYear = document.getElementById('undergraduate-year').value;
    undergraduatePercentage = document.getElementById('undergraduate-percentage').value;

    // Upload resume to Cloudinary
    uploadResume(resumeFile)
        .then(resumeUrl => {
            // Save data to Firebase Firestore
            addDoc(collection(db, "applications"), {
                firstName: firstName,
                lastName: lastName,
                email: email,
                contact: contact,
                gender: gender,
                resumeUrl: resumeUrl,
                qualification: qualification,
                sscBoard: sscBoard,
                sscYear: sscYear,
                sscCgpa: sscCgpa,
                intermediateBoard: intermediateBoard,
                intermediateYear: intermediateYear,
                intermediatePercentage: intermediatePercentage,
                diplomaCollege: diplomaCollege,
                diplomaYear: diplomaYear,
                diplomaPercentage: diplomaPercentage,
                undergraduateCollege: undergraduateCollege,
                undergraduateYear: undergraduateYear,
                undergraduatePercentage: undergraduatePercentage,
                timestamp: serverTimestamp()
            }).then(() => {
                // Redirect to a thank you page after successful submission
                alert("Application submitted successfully!");
                window.location.href = "thankyou.html";
            }).catch(error => {
                console.error("Error saving data to Firebase: ", error);
                alert("Error submitting form. Please try again later.");
            });
        })
        .catch(error => {
            console.error("Error uploading resume: ", error);
            alert("Error uploading resume. Please try again.");
        });
});

