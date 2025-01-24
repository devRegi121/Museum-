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

fetch('https://localhost:7158/SetCookie', {
    method: 'GET', // or 'POST'
    credentials: 'include' // Ensures cookies are sent with the request
})
.then(response => response.json())
.then(data => {
    console.log(data); // Handle response
})
.catch(error => console.log(error));
async function fetchCollections() {
    const response = await fetch("https://localhost:5001/api/works");
    const collections = await response.json();
    displayCollections(collections);
}

function displayCollections(collections) {
    const container = document.getElementById("collections-container");
    collections.forEach(work => {
        const card = `
            <div class="card">
                <img src="placeholder.jpg" alt="${work.name}" class="zoom-on-hover" />
                <div class="card-body">
                    <h5 class="card-title">${work.name}</h5>
                    <p class="card-text">${work.description}</p>
                    <button class="btn-yellow">Learn More</button>
                </div>
            </div>`;
        container.innerHTML += card;
    });
}

fetchCollections();



