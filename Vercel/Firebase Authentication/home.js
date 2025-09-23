import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded, get, set } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

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
const db = getDatabase(app);
const auth = getAuth(app);

let button = document.getElementById("btn");
let container = document.getElementById("container");
const chatBox = document.getElementById("chat-box");
const input = document.getElementById("message");
const submitBtn = document.getElementById("submit");

const adminEmail = "test@gmail.com"; 
const adminLink = document.getElementById("adminLink");

button.addEventListener("click", function () {
  container.style.display =
    container.style.display === "none" || container.style.display === "" ? "block" : "none";
});

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  if (user.email === adminEmail) {
    adminLink.style.display = "inline-block";
  } else {
    adminLink.style.display = "none";
  }


  const messagesRef = ref(db, "chats/" + user.uid + "/messages/");

  async function sendMessage() {
    const msg = input.value.trim();
    if (msg === "") return;

    const userRef = ref(db, "users/" + user.uid);
    const snap = await get(userRef);
    let senderName = "Anonymous";

    if (snap.exists()) {
      senderName = snap.val().firstName || "Anonymous";
    }


    const chatUserRef = ref(db, "chats/" + user.uid);
    set(chatUserRef, { name: senderName });

  
    push(messagesRef, {
      text: msg,
      senderId: user.uid,
      senderName: senderName,
      timestamp: Date.now()
    });

    input.value = "";
  }


  onChildAdded(messagesRef, (snapshot) => {
    const data = snapshot.val();
    const isMe = data.senderId === user.uid;

    const message = document.createElement("p");
    message.innerHTML = `<strong>${data.senderName}:</strong> ${data.text}`;
    message.style.background = isMe ? "#0081C9" : "#E5E5E5";
    message.style.color = isMe ? "white" : "black";
    message.style.padding = "8px 12px";
    message.style.borderRadius = "15px";
    message.style.margin = "5px 0";
    message.style.display = "inline-block";

    const messagediv = document.createElement("div");
    messagediv.style.textAlign = isMe ? "right" : "left";
    messagediv.appendChild(message);

    chatBox.appendChild(messagediv);
    chatBox.scrollTop = chatBox.scrollHeight;
  });

  submitBtn.addEventListener("click", sendMessage);
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      signOut(auth).then(() => {
        window.location.href = "index.html";
      });
    });
  }
});
