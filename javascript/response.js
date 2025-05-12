document.addEventListener('DOMContentLoaded', function() {
    // Parse the query string from the URL
    const params = new URLSearchParams(window.location.search);

    // Populate the response page with the form data
    document.getElementById('response-name').textContent = params.get('name');
    document.getElementById('response-age').textContent = params.get('age');
    document.getElementById('response-gender').textContent = params.get('gender');
    document.getElementById('response-email').textContent = params.get('email');
    document.getElementById('response-updates').textContent = params.get('updates');

    // Go back button functionality
    document.getElementById('back-button').addEventListener('click', function() {
        window.history.back();
    });

    // Ensure form is cleared when navigating away from the response page
    window.addEventListener('beforeunload', function() {
        // The form will be cleared when the user navigates away from this page
        sessionStorage.setItem('formCleared', 'true');
    });
});

