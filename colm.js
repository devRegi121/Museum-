document.addEventListener('DOMContentLoaded', function () {
    // Select all images with the class 'zoom-on-hover'
    const images = document.querySelectorAll('.zoom-on-hover');

    // Add event listeners for mouseenter and mouseleave
    images.forEach((image) => {
        image.addEventListener('mouseenter', () => {
            image.style.transform = 'scale(1.1)'; // Zoom in
            image.style.transition = 'transform 0.3s ease-in-out'; // Smooth transition
        });

        image.addEventListener('mouseleave', () => {
            image.style.transform = 'scale(1)'; // Reset zoom
        });
    });
});
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}

