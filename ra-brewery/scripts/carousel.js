
const slides = document.getElementsByClassName("my-slides");
const dots = document.getElementsByClassName('dot');


let slideIndex = 0;
showSlides();

$(document).keydown(function(e) {

if(e.key == 'ArrowRight') {
    currentSlide(slideIndex + 1);
}
else if(e.key == 'ArrowLeft') {
    currentSlide(slideIndex - 1);
}
else {
    return;
}
});


function showSlides() {
  let i;
  // var slides = document.getElementsByClassName("my-slides");
  // var dots = document.getElementsByClassName("dot"); 
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    dots[i].classList.remove("active");

  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1} 
  slides[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].classList.add("active");
  setTimeout(showSlides, 4000); //change every 4 secs
}

function currentSlide(n) {
  if(n < 0) {
    n = 4;
  }
  else if(n > 4) {
    n = 0;
  }
  $('.dot.active').removeClass('active');
  $('.my-slides').css('display', 'none');
  slideIndex = n;
  slides[n].style.display = "block";
  dots[n].classList.add("active");
}

