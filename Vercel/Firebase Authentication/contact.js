
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); 


  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let subject = document.getElementById("subject").value.trim();
  let message = document.getElementById("message").value.trim();


  let nameError = document.getElementById("nameError");
  let emailError = document.getElementById("emailError");
  let subjectError = document.getElementById("subjectError");
  let messageError = document.getElementById("messageError");


  nameError.innerText = "";
  emailError.innerText = "";
  subjectError.innerText = "";
  messageError.innerText = "";

  let valid = true;


  if (name === "" || name.length < 3) {
    nameError.innerText = "Please enter at least 3 characters for your name.";
    valid = false;
  }

  let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    emailError.innerText = "Please enter a valid email address.";
    valid = false;
  }


  if (subject === "") {
    subjectError.innerText = "Please enter a subject.";
    valid = false;
  }


  if (message.length < 10) {
    messageError.innerText = "Message must be at least 10 characters.";
    valid = false;
  }

  
  if (valid) {
    alert("Your message has been sent successfully!");
    document.getElementById("contactForm").reset(); 
  }
});
