import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  setPersistence, 
  browserLocalPersistence, 
   onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { 
  getDatabase, 
  ref, 
  set 
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCdALI7GHc5RbCDmE_D0nGaQiWHxp6Myr8",
  authDomain: "grand-login-78c25.firebaseapp.com",
  databaseURL: "https://grand-login-78c25-default-rtdb.firebaseio.com",
  projectId: "grand-login-78c25",
  storageBucket: "grand-login-78c25.appspot.com",
  messagingSenderId: "12371664974",
  appId: "1:12371664974:web:8c9c6daaa06174b347231f",
  measurementId: "G-XE79HKZLLT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);


function showError(id, message) {
  const el = document.getElementById(id);
  if (el) el.textContent = message;
}
 
const signupBtn = document.getElementById("createBtn");
if (signupBtn) {
  signupBtn.addEventListener("click", async (e) => {
    e.preventDefault();


    showError("nameError", "");
    showError("usernameError", "");
    showError("password1Error", "");
    showError("password2Error", "");

    const email = document.getElementById("username")?.value;
    const password = document.getElementById("password1")?.value;
    const confirmPass = document.getElementById("password2")?.value;
    const firstName = document.getElementById("name")?.value;


     if (!firstName) {
      showError("nameError", "Name is rNamequired");
      return;
    }
    if (!email.endsWith("@gmail.com")) {
      showError("usernameError", "Please Enter valid an email");
      return;
    }
    if (password.length < 6) {
      showError("password1Error", "Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPass) {
      showError("password2Error", "Passwords do not match");
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);


      await set(ref(db, "users/" + userCred.user.uid), {
        firstName: firstName,
        email: email
      });

      window.location.href = "home.html";
    } catch (error) {
      showError("usernameError", "Something went wrong, please try again.");
    }
  });
}


const loginBtn = document.getElementById("submit");
if (loginBtn) {
  loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    
    showError("loginError", "");

    const email = document.getElementById("email")?.value;
    const password = document.getElementById("password")?.value;

    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "home.html";
    } catch (error) {
      showError("loginError", "Something went wrong, please try again.");
    }
  });
}

onAuthStateChanged(auth, (user) => {
  if (user && window.location.pathname.includes("index.html")) {
    window.location.href = "home.html";
  }
});
