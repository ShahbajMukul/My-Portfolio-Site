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

  // Timeline navigation functionality
  const timelineItems = document.querySelectorAll('.timeline-item');
  const sections = document.querySelectorAll('section[id]');

  // Update active timeline item based on scroll position
  function updateActiveTimeline() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        timelineItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${section.id}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  // Smooth scroll to section when clicking timeline items
  timelineItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      targetSection.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Update timeline on scroll
  window.addEventListener('scroll', updateActiveTimeline);
  updateActiveTimeline(); // Initial update
});

// Sticky timeline functionality
document.addEventListener('DOMContentLoaded', () => {
  const timeline = document.querySelector('.category-timeline');
  const main = document.querySelector('main#card1');
  let timelineOffset = timeline.offsetTop;
  let timelineHeight = timeline.offsetHeight;
  
  // Function to handle scroll and make timeline sticky when needed
  function handleScroll() {
      // Recalculate on scroll in case of dynamic content
      if (!timeline.classList.contains('sticky')) {
          timelineOffset = timeline.offsetTop;
          timelineHeight = timeline.offsetHeight;
      }
      
      // Check if we've scrolled past the original position of the timeline
      if (window.scrollY > timelineOffset) {
          timeline.classList.add('sticky');
          main.classList.add('timeline-is-sticky');
          // Add the height as padding to prevent content jump
          main.style.paddingTop = `${timelineHeight}px`;
      } else {
          timeline.classList.remove('sticky');
          main.classList.remove('timeline-is-sticky');
          main.style.paddingTop = '0';
      }
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
  
  // Initial check in case page is loaded in middle
  handleScroll();
  
  // Update values on window resize
  window.addEventListener('resize', () => {
      if (!timeline.classList.contains('sticky')) {
          timelineOffset = timeline.offsetTop;
      }
      timelineHeight = timeline.offsetHeight;
      handleScroll();
  });
});

// Timeline navigation and progress functionality
document.addEventListener('DOMContentLoaded', () => {
  const timelineItems = document.querySelectorAll('.timeline-item');
  const sections = document.querySelectorAll('section[id]');
  const progressBar = document.querySelector('.timeline-progress-bar');

  // Calculate page scroll progress and update timeline
  function updateProgress() {
    // Calculate how far down the page the user has scrolled
    const scrollTop = window.scrollY;
    const winHeight = window.innerHeight;
    const docHeight = document.body.scrollHeight - winHeight;
    const scrollPercentage = scrollTop / docHeight * 100;

    // Update the width of the progress bar
    progressBar.style.width = scrollPercentage + '%';

    const waveOffset = (Math.sin(Date.now() / 1000) * 3) + 3; // Small sine wave oscillation
    progressBar.style.height = (100 + waveOffset) + '%';

    // Update active section in timeline
    updateActiveSection(scrollTop);
  }

  // Update which timeline item is active based on scroll position
  function updateActiveSection(scrollY) {
    // Find the current section
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionTop = section.offsetTop - 100;

      if (scrollY >= sectionTop) {
        timelineItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${section.id}`) {
            item.classList.add('active');
          }
        });
        break;
      }
    }
  }

  // Smooth scroll to section when clicking timeline items
  timelineItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      window.scrollTo({
        top: targetSection.offsetTop - 70, // Account for timeline height
        behavior: 'smooth'
      });
    });
  });

  // Update progress on scroll
  window.addEventListener('scroll', updateProgress);

  // Initial update
  updateProgress();
});