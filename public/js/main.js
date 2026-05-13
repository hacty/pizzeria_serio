let index = 0;
const slides = document.querySelectorAll(".slide");

function showSlide() {
  slides.forEach(s => s.classList.remove("active"));
  slides[index].classList.add("active");
}

// botones ❮ ❯
function moveSlide(step) {
  index += step;

  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;

  showSlide();
}

// autoplay
setInterval(() => {
  moveSlide(1);
}, 3000);

// inicial
showSlide();