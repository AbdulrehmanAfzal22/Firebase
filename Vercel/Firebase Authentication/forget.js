
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyCdALI7GHc5RbCDmE_D0nGaQiWHxp6Myr8",
  authDomain: "grand-login-78c25.firebaseapp.com",
  projectId: "grand-login-78c25",
  storageBucket: "grand-login-78c25.appspot.com",
  messagingSenderId: "12371664974",
  appId: "1:12371664974:web:8c9c6daaa06174b347231f",
  measurementId: "G-XE79HKZLLT"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const resetBtn = document.getElementById("resetBtn");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");

resetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();

  if (email === "") {
    emailError.innerText = "Please enter an email";
    return;
  } else if (!email.endsWith("@gmail.com")) {
    emailError.innerText = "Please enter a valid Gmail address";
    return;
  } else {
    emailError.innerText = "";
  }

sendPasswordResetEmail(auth, email, {
  url: window.location.origin + "/index.html"
})
  .then(() => {
    alert("Password reset email sent! Check your Gmail. Then click the link in the email to reset your password.");
  })
  .catch((error) => {
    emailError.innerText = error.message;
  });
});
