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
    // Select all card elements
    const cards = document.querySelectorAll('.card');
  
    // Add click event listener to each card
    cards.forEach(card => {
      card.addEventListener('click', function () {
        // Toggle the 'flipped' class on the clicked card
        this.classList.toggle('flipped');
      });
    });
  });
  
document.addEventListener("DOMContentLoaded", function() {
    const textImagePairs = document.querySelectorAll('.text-image-pair');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once it's animated
            }
        });
    }, {
        threshold: 0.1 // Trigger animation when 10% of the element is visible
    });

    textImagePairs.forEach(pair => {
        observer.observe(pair);
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('subscription-form');

    // Add an event listener for form submission
    form.addEventListener('submit', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Capture form data
        const formData = {
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            gender: document.getElementById('gender').value,
            email: document.getElementById('email').value,
            updates: document.getElementById('updates').checked ? "Yes" : "No"
        };

        // Redirect to the response page with the data encoded in the URL
        const queryString = new URLSearchParams(formData).toString();
        window.location.href = `response.html?${queryString}`;
    });

    const clearButton = document.getElementById('clear-button');

    // Add an event listener for the clear button
    clearButton.addEventListener('click', function() {
        // Reset the form
        form.reset();
    });

    // Clear the form on pageshow event
    window.addEventListener('pageshow', function() {
        form.reset();
    });
});

    

