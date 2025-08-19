// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Select all links that start with '#'
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  
  for (const link of scrollLinks) {
    link.addEventListener('click', function(event) {
      // Prevent the default jump-to-section behavior
      event.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        smoothScrollTo(targetElement);
      }
    });
  }
});


function smoothScrollTo(targetElement) {
  // 1. Get the navbar and its height
  const navbar = document.querySelector('nav'); 
  const navbarHeight = navbar ? navbar.offsetHeight : 0;

  // 2. Calculate the target position and subtract the navbar height
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

  // The rest of the animation code remains the same...
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 1000;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}