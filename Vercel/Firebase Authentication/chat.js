import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { 
  getDatabase, ref, onChildAdded, push, get 
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";


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

const usersDiv = document.querySelector(".user");
const chatDiv = document.querySelector(".chat");
let input = document.querySelector(".input");
let submitBtn = document.getElementById("submit");

let currentChatUser = null;


function loadUsers() {
  const chatsRef = ref(db, "chats/");
  onChildAdded(chatsRef, (snap) => {
    const userId = snap.key;
    const userData = snap.val();

    const btn = document.createElement("button");
    btn.classList.add("user1");
    btn.textContent = userData.name || "Unknown User";
    btn.onclick = () => loadMessages(userId, userData.name);

    usersDiv.appendChild(btn);
  });
}


function loadMessages(userId, name) {
  currentChatUser = userId;
  chatDiv.innerHTML = `<div class="header"><h2>Chat with ${name}</h2></div>
    <div id="chat-box" style="height:60vh; overflow-y:auto; background:white; padding:10px;"></div>
    <input type="text" class="input" placeholder="Type your message">
    <button class="btn1" id="submit">➤</button>`;

  const chatBox = document.getElementById("chat-box");

  const msgsRef = ref(db, "chats/" + userId + "/messages/");
  onChildAdded(msgsRef, (snap) => {
    const msg = snap.val();
    const p = document.createElement("p");
    p.innerHTML = `<strong>${msg.senderName}:</strong> ${msg.text}`;
    chatBox.appendChild(p);
    chatBox.scrollTop = chatBox.scrollHeight;
  });


  input = chatDiv.querySelector(".input");
  submitBtn = chatDiv.querySelector("#submit");
  submitBtn.addEventListener("click", () => sendMessage(userId));
}


function sendMessage(userId) {
  const text = input.value.trim();
  if (!text) return;

  const msgsRef = ref(db, "chats/" + userId + "/messages/");
  push(msgsRef, {
    text,
    senderId: "admin",
    senderName: "Admin",
    timestamp: Date.now()
  });
  input.value = "";
}

onAuthStateChanged(auth, (user) => {
  if (!user || user.email !== "test@gmail.com") {
    window.location.href = "index.html";
    return;
  }
  loadUsers();
});
let back = document.getElementById("back")
back.addEventListener("click" , function () {
window.location.href = "home.html";
})