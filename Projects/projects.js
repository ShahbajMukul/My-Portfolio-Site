function initSlideshow() {
  const slideshows = document.querySelectorAll('.slideshow-container');

  slideshows.forEach(slideshow => {
    const images = slideshow.querySelectorAll('img');
    if (images.length) {
      images[0].style.display = 'block';
    }

    // Update next/prev button event listeners to change the slide
    slideshow.querySelectorAll('.next, .prev').forEach(button => {
      button.addEventListener('click', () => {
        const isNext = button.classList.contains('next');
        changeSlide(slideshow, isNext);
      });
    });
  });
}

// Function to change the slide
function changeSlide(slideshow, next = true) {
  const images = slideshow.querySelectorAll('img');
  let currentImageIndex = [...images].findIndex(img => img.style.display === 'block');

  images[currentImageIndex].style.display = 'none';

  if (next) {
    currentImageIndex = (currentImageIndex + 1) % images.length;
  } else {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  }

  images[currentImageIndex].style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
  initSlideshow();

  const nextButtons = document.querySelectorAll('.next');
  const prevButtons = document.querySelectorAll('.prev');


  nextButtons.forEach(button => {
    button.addEventListener('click', event => {
      const slideshow = event.target.closest('.slideshow-container');
      changeSlide(slideshow);
    });
  });

  prevButtons.forEach(button => {
    button.addEventListener('click', event => {
      const slideshow = event.target.closest('.slideshow-container');
      changeSlide(slideshow, false);
    });
  });
});