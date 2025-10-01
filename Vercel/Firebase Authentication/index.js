import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  setPersistence, 
  browserLocalPersistence 
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

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
const analytics = getAnalytics(app);
const auth = getAuth(app);


const submit = document.getElementById("submit");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const emailError = document.getElementById("para1");  
const passwordError = document.getElementById("para12"); 


function showError(el, message) {
  if (el) el.innerText = message;
}

function clearErrors() {
  showError(emailError, "");
  showError(passwordError, "");
}

submit.addEventListener("click", async (event) => {
  event.preventDefault(); 
  clearErrors();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();


  if (!email.endsWith("@gmail.com")){
    showError(emailError, "Please enter an email");
    return;
  }

  if (password === email) {
    showError(passwordError, "Password must be different from email");
    return;
  }

  if (password.length < 6) {
    showError(passwordError, "Password must be at least 6 characters");
    return;
  }

  try {
    await setPersistence(auth, browserLocalPersistence);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
   

  
    window.location.href = "home.html"; 
  } catch (error) {
    console.error("Login error:", error.code, error.message);

    switch (error.code) {
      case "auth/user-not-found":
        showError(emailError, "No account found with this email");
        break;
      case "auth/wrong-password":
      case "auth/invalid-credential":
        showError(passwordError, "Wrong password or email. Try again!");
        break;
      case "auth/invalid-email":
        showError(emailError, "Invalid email format");
        break;
      default:
        showError(emailError, error.message);
    }
  }
});
