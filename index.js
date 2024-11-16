// navbar toggling
const menuToggle = document.querySelector('.navbar-toggler');
const navLinks = document.querySelector('#navbarNav');


// Registration section 
// events
document.addEventListener('DOMContentLoaded', function () {
    const options = {
        threshold: 0.5 // Trigger animation when 50% of the section is in view
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation classes when the section comes into view
                entry.target.querySelector('.welcome-title').classList.add('animate');
                entry.target.querySelector('.welcome-subtitle').classList.add('animate');
                entry.target.querySelector('.welcome-button').classList.add('animate');
                observer.unobserve(entry.target); // Stop observing after animation
            }
        });
    }, options);

    // Observe the "Welcome" section
    const welcomeSection = document.getElementById('welcome');
    observer.observe(welcomeSection);
});
// registration modal
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('registrationForm').addEventListener('submit', function (event) {
        event.preventDefault(); 

        // Capture form values
        const firstName = document.getElementById('firstName').value.trim();
        const surname = document.getElementById('surname').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const visitDate = document.getElementById('visitDate').value;
        const visitTime = document.getElementById('visitTime').value;
        const message = document.getElementById('message').value.trim();

        // Validation for required fields
        if (!firstName || !surname || !email || !visitDate) {
            alert('Please fill in all required fields.');
            return;
        }

        // Email format validation
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!email.match(emailPattern)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Log the form data to the console
        console.log("First Name:", firstName);
        console.log("Surname:", surname);
        console.log("Email:", email);
        console.log("Phone Number:", phone);
        console.log("Preferred Visit Date:", visitDate);
        console.log("Preferred Visit Time:", visitTime);
        console.log("Message:", message);

        // Show success message and reset the form
        alert('Thank you for registering! We look forward to your visit.');
        document.getElementById('registrationForm').reset();
        const modal = bootstrap.Modal.getInstance(document.getElementById('registrationModal'));
        modal.hide();
    });
});