const slides = document.querySelectorAll(".slide");
let currentIndex = 0;

function showNextSlide() {
  slides[currentIndex].classList.remove("active"); 
  currentIndex = (currentIndex + 1) % slides.length; 
  slides[currentIndex].classList.add("active");
}


setInterval(showNextSlide, 5000);



const slides1 = document.querySelectorAll(".slide1");
let currentIndex1 = 0;

function showNextSlide1() {
  slides1[currentIndex1].classList.remove("active");
  currentIndex1 = (currentIndex1 + 1) % slides1.length;
  slides1[currentIndex1].classList.add("active");
}

setInterval(showNextSlide1, 5000); 
