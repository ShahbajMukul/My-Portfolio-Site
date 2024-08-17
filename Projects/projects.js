function initSlideshow() {
  const slideshows = document.querySelectorAll('.slideshow-container');

  slideshows.forEach(slideshow => {
    let interval;
    const images = slideshow.querySelectorAll('img');
    if (images.length) {
      images[0].style.display = 'block';
    }

    function startAutoSlide() {
      interval = setInterval(() => {
        changeSlide(slideshow);
      }, 3000); // Change slide every 3 seconds
    }

    function stopAutoSlide() {
      clearInterval(interval);
    }

    // Start the slideshow
    startAutoSlide();

    // Listen for mouseover and mouseout
    slideshow.addEventListener('mouseover', stopAutoSlide);
    slideshow.addEventListener('mouseout', startAutoSlide);

    // Update next/prev button event listeners to pause the slideshow
    slideshow.querySelectorAll('.next, .prev').forEach(button => {
      button.addEventListener('click', () => {
        stopAutoSlide();
        // Restart the slideshow after 7 seconds
        setTimeout(startAutoSlide, 7000); // 7 seconds timeout
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
