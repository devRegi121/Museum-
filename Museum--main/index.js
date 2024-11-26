// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select all images with the class 'zoom-on-hover'
    const images = document.querySelectorAll('.zoom-on-hover');

    // Add event listeners for mouseenter and mouseleave on each image
    images.forEach((image) => {
        // When the mouse enters the image, zoom in
        image.addEventListener('mouseenter', () => {
            image.style.transform = 'scale(1.1)'; // Zoom in
            image.style.transition = 'transform 0.3s ease-in-out'; // Smooth transition
        });

        // When the mouse leaves the image, reset the zoom
        image.addEventListener('mouseleave', () => {
            image.style.transform = 'scale(1)'; // Reset to original size
        });
    });
});
