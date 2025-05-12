document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.fade-in');

  const options = {
      rootMargin: '0px', // Trigger as soon as it enters the viewport
      threshold: 0.01 // A lower threshold to trigger the animation earlier
  };

  const observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target); // Unobserve after adding the class
          }
      });
  }, options);

  sections.forEach(section => {
      observer.observe(section);
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.card-container');
  const cards = document.querySelectorAll('.card');
  const totalCards = cards.length;
  let currentIndex = 0;

  function updatePosition() {
    const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight) * 2; // Include both sides of the margin
    const containerWidth = document.querySelector('.fact-gallery').offsetWidth;
    const offset = -currentIndex * cardWidth + (containerWidth - cardWidth) / 2;
    container.style.transform = `translateX(${offset}px)`;

    cards.forEach((card, index) => {
      card.classList.toggle('active', index === currentIndex); // Apply active class to the focused card
    });
  }

  document.querySelector('.prev').addEventListener('click', function () {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalCards - 1; // Wrap to last if at the start
    updatePosition();
  });

  document.querySelector('.next').addEventListener('click', function () {
    currentIndex = (currentIndex < totalCards - 1) ? currentIndex + 1 : 0; // Wrap to start if at the end
    updatePosition();
  });

  // Initialize position
  updatePosition();
});

  
