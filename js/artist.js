document.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem('username');
    const userRole = localStorage.getItem('role');

    // DOM Elements
    const userGreeting = document.getElementById('userGreeting');
    const greetingMessage = document.getElementById('greetingMessage');
    const showProfileBtn = document.getElementById('showProfileBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const cartBtn = document.getElementById('cartBtn');

    // Manage User Authentication Status
    if (username) {
        // User is logged in
        if (userGreeting) userGreeting.style.display = 'inline-block';
        if (greetingMessage) greetingMessage.textContent = `Hello, ${username}`;
        if (logoutBtn) logoutBtn.style.display = 'inline-block';
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (cartBtn) cartBtn.style.display = 'inline-block';

        // Logout functionality
        if (logoutBtn && !logoutBtn.hasAttribute('data-logout-attached')) {
            logoutBtn.addEventListener('click', function () {
                localStorage.removeItem('username');
                localStorage.removeItem('id');
                localStorage.removeItem('role');
                window.location.reload();
            });
            logoutBtn.setAttribute('data-logout-attached', 'true');
        }
    } else {
        // User is not logged in
        if (userGreeting) userGreeting.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (loginBtn) loginBtn.style.display = 'inline-block';
        if (registerBtn) registerBtn.style.display = 'inline-block';
        if (cartBtn) cartBtn.style.display = 'none';
    }

    // Reference the search input field
    const searchInput = document.querySelector('.form-control[placeholder="Search"]');

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase(); // Normalize the search query to lowercase
            const artistCards = document.querySelectorAll('.card.mb-3'); // Select all artist cards

            artistCards.forEach(card => {
                // Extract searchable fields from the artist card
                const artistName = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
                const artistDescription = card.querySelector('.card-text')?.textContent.toLowerCase() || '';

                // Check if the query matches either the artist's name or description
                if (artistName.includes(query) || artistDescription.includes(query)) {
                    card.style.display = ''; // Show the card if it matches
                } else {
                    card.style.display = 'none'; // Hide the card if it doesn't match
                }
            });
        });
    }

});

$(document).ready(function () {
    $.ajax({
        url: 'https://localhost:44326/api/Artist/get-all-artists',
        method: 'GET',
        success: function (data) {
            console.log(data); // Ensure API response is correct

            const artistsContainer = $('#artists-container'); // Update the container selector
            const isAdmin = localStorage.getItem("role") === 'Admin';

            data.forEach(artist => {
                const card = `
  <div class="col">
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${artist.imageUrl}" class="img-fluid rounded-start" alt="${artist.name}">
        </div>
        <div class="col-md-8">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${artist.name}</h5>
            <p class="card-text">${artist.description}</p>
            ${isAdmin ? `
            <div class="d-flex flex-column mt-3">
              <button class="btn btn-secondary mb-2" id="editButton${artist.id}">Edit</button>
              <button class="btn btn-success d-none mb-2" id="saveButton${artist.id}">Save</button>
              <button class="btn btn-danger mb-2" id="deleteButton${artist.id}">Delete</button>
            </div>` : ''}
          </div>
        </div>
      </div>
    </div>
  </div>`;


                // Append the card to the container
                artistsContainer.append(card);

                // Add functionality for admin buttons
                if (isAdmin) {
                    // Edit button click handler
                    $(`#editButton${artist.id}`).on('click', function () {
                        $(this).addClass('d-none');
                        $(`#saveButton${artist.id}`).removeClass('d-none');

                        // Make fields editable
                        const cardBody = $(this).closest('.card-body');
                        const title = cardBody.find('.card-title');
                        const description = cardBody.find('.card-text');

                        title.attr('contenteditable', 'true').addClass('editable');
                        description.attr('contenteditable', 'true').addClass('editable');
                    });

                    // Save button click handler
                    $(`#saveButton${artist.id}`).on('click', function () {
                        const cardBody = $(this).closest('.card-body');
                        const title = cardBody.find('.card-title');
                        const description = cardBody.find('.card-text');

                        // Extract updated values
                        const updatedName = title.text().trim();
                        const updatedDescription = description.text().trim();

                        // Prepare updated artist data
                        const updatedArtist = {
                            id: artist.id,
                            name: updatedName,
                            description: updatedDescription,
                            imageUrl: artist.imageUrl // Keeping image URL unchanged for simplicity
                        };

                        // Send updated data to the server
                        $.ajax({
                            url: `https://localhost:44326/api/Artist/update-artist-by-id/${artist.id}`,
                            method: 'PUT',
                            contentType: 'application/json',
                            data: JSON.stringify(updatedArtist),
                            success: function () {
                                $(`#editButton${artist.id}`).removeClass('d-none');
                                $(`#saveButton${artist.id}`).addClass('d-none');

                                // Make fields non-editable
                                title.attr('contenteditable', 'false').removeClass('editable');
                                description.attr('contenteditable', 'false').removeClass('editable');
                            },
                            error: function (error) {
                                console.error('Error updating artist:', error);
                                alert('Failed to update artist.');
                            }
                        });
                    });

                    // Delete button click handler
                    $(`#deleteButton${artist.id}`).on('click', function () {
                        if (confirm("Are you sure you want to delete this artist?")) {
                            $.ajax({
                                url: `https://localhost:44326/api/Artist/delete-artist-by-id/${artist.id}`,
                                method: 'DELETE',
                                success: function () {
                                    $(`#deleteButton${artist.id}`).closest('.card').remove();
                                },
                                error: function (error) {
                                    console.error('Error deleting artist:', error);
                                    alert('Failed to delete artist.');
                                }
                            });
                        }
                    });
                }
            });

            // Add "Add New Artist" button if admin
            if (isAdmin) {
                const addArtistButton = `
                    <button class="btn btn-warning" id="addNewArtistButton" style="position: fixed; bottom: 20px; right: 20px; z-index: 1000;">
                        + Add New Artist
                    </button>`;
                $('body').append(addArtistButton);

                // Add New Artist Button click handler
                $(document).off('click', '#addNewArtistButton').on('click', '#addNewArtistButton', function () {
                    const newArtistCard = `
                        <div class="card mb-3 new-artist-card">
                            <img src="default.jpg" class="card-img-top preview-image" alt="Artist Image">
                            <div class="card-body">
                                <input type="text" class="form-control mb-2 artist-name" placeholder="Artist Name">
                                <textarea class="form-control mb-2 artist-description" placeholder="Artist Description"></textarea>
                                <input type="text" class="form-control mb-2 artist-image-url" placeholder="Artist Image URL">
                                <button class="btn btn-success save-new-artist">Save</button>
                                <button class="btn btn-danger cancel-new-artist">Cancel</button>
                            </div>
                        </div>`;
                    $('#artists-container').prepend(newArtistCard);
                });

                // Cancel New Artist Button click handler
                $(document).on('click', '.cancel-new-artist', function () {
                    $(this).closest('.new-artist-card').remove();
                });

                // Save New Artist Button click handler
                $(document).off('click', '.save-new-artist').on('click', '.save-new-artist', function () {
                    const cardBody = $(this).closest('.card-body');
                    const newArtistName = cardBody.find('.artist-name').val();
                    const newArtistDescription = cardBody.find('.artist-description').val();
                    const newArtistImageUrl = cardBody.find('.artist-image-url').val();

                    // Validate form data
                    if (!newArtistName || !newArtistDescription || !newArtistImageUrl) {
                        alert('Please fill in all fields correctly.');
                        return;
                    }

                    const newArtist = {
                        name: newArtistName,
                        description: newArtistDescription,
                        imageUrl: newArtistImageUrl
                    };

                    // Send new artist data to the server
                    $.ajax({
                        url: 'https://localhost:44326/api/Artist/add-artist',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(newArtist),
                        success: function () {
                            window.location.reload();
                        },
                        error: function (error) {
                            console.error('Error adding new artist:', error);
                            alert('Failed to add new artist.');
                        }
                    });
                });
            }
        },
        error: function () {
            $('#artists-container').html('Error fetching artists. Please try again later.');
        }
    });
});
