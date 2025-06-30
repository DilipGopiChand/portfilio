document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            // Close mobile menu if it's open (added for better UX on mobile)
            const menuToggle = document.getElementById('menu-toggle');
            if (menuToggle && menuToggle.checked) {
                menuToggle.checked = false;
            }

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Adjust scroll position to account for fixed header
                const headerOffset = document.querySelector('header').offsetHeight;
                window.scrollTo({
                    top: targetSection.offsetTop - headerOffset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Smooth scrolling for "Let's Connect" button
    const connectButton = document.querySelector('.connect-button .button');
    if (connectButton) {
        connectButton.addEventListener('click', function(e) {
            e.preventDefault();

            // Close mobile menu if it's open
            const menuToggle = document.getElementById('menu-toggle');
            if (menuToggle && menuToggle.checked) {
                menuToggle.checked = false;
            }

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const headerOffset = document.querySelector('header').offsetHeight;
                window.scrollTo({
                    top: targetSection.offsetTop - headerOffset,
                    behavior: 'smooth'
                });
            }
        });
    }

    // --- Google Apps Script Form Submission ---
    const contactForm = document.getElementById('contactForm');
    const formMessages = document.getElementById('formMessages');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent the default form submission

            formMessages.textContent = 'Sending message...';
            formMessages.style.color = '#77aaff'; // A neutral color for sending

            // Get the Google Apps Script Web App URL from your deployment
            // THIS IS THE LINK YOU PROVIDED:
            const googleAppsScriptURL = 'https://script.google.com/macros/s/AKfycbxqcjAsghDsT1vcSQnDNA6VKWtWpWUHD6TuIs88C9O4gaI07x0sS6QATELoVDYsv9izzA/exec'; 

            const formData = new FormData(contactForm); // Get all form data

            // Convert FormData to URL-encoded string which Apps Script expects
            const data = new URLSearchParams();
            for (const pair of formData) {
                data.append(pair[0], pair[1]);
            }

            fetch(googleAppsScriptURL, {
                method: 'POST',
                body: data // Send the URL-encoded data
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Apps Script returns JSON
            })
            .then(result => {
                if (result.result === 'success') {
                    formMessages.textContent = result.message;
                    formMessages.style.color = '#4CAF50'; // Green for success
                    contactForm.reset(); // Clear the form
                } else {
                    formMessages.textContent = result.message || 'An unexpected error occurred.';
                    formMessages.style.color = '#ff4d4d'; // Red for error
                }
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                formMessages.textContent = 'Failed to send message. Please try again later.';
                formMessages.style.color = '#ff4d4d'; // Red for error
            });
        });
    }
});

// Scroll-to-top button functionality (outside DOMContentLoaded as it uses window.onscroll)
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const scrollThreshold = 300; // Pixels to scroll down before the button appears

// Show or hide the button based on scroll position
window.onscroll = function() {
    if (document.body.scrollTop > scrollThreshold || document.documentElement.scrollTop > scrollThreshold) {
        scrollToTopBtn.style.display = "flex"; // Use flex to match CSS
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

// Smooth scroll to top when button is clicked
scrollToTopBtn.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default jump behavior
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Smooth scrolling effect
    });
});