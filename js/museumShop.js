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
  const paintingContainer = $('#paintingContainer');

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

  const searchInput = document.querySelector('.form-control[placeholder="Search"]');
  
  // Search Filter
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase(); 
    const cards = document.querySelectorAll('.card'); // Select all card elements

    cards.forEach(card => {
      // Extract searchable fields from the card
      const cardTitle = card.querySelector('.card-header h4').textContent.toLowerCase();
      const artistName = card.querySelector(`[id^="artistName"]`).value.toLowerCase();
      const theme = card.querySelector(`[id^="theme"]`).value.toLowerCase();
      const price = card.querySelector(`[id^="price"]`).value.toLowerCase();

      // Check if the query matches any of the fields
      if (
        cardTitle.includes(query) ||
        artistName.includes(query) ||
        theme.includes(query) ||
        price.includes(query)
      ) {
        card.style.display = ''; // Show the card if it matches
      } else {
        card.style.display = 'none'; // Hide the card if it doesn't match
      }
    });
  });

  $(document).ready(function () {
    

    // Display paintings
    $.ajax({
      url: 'https://localhost:44326/api/Paintings/get-all-paintings',
      method: 'GET',
      success: function (data) {
        console.log('Fetched data:', data);

        const paintingContainer = $('#paintingContainer');
        const isAdmin = userRole === 'Admin'; 

        data.forEach(painting => {
          const artistName = painting.artist && painting.artist.name ? painting.artist.name : 'Unknown Artist';

          const card = `
            <div class="card h-100 mb-3" id="paintingCard${painting.id}">
              <div class="card-header">
                <h4>${painting.name}</h4>
              </div>
              <img src="${painting.imageUrl}" class="card-img-top" alt="${painting.name}">
              <div class="card-body">
                <div class="row mb-3">
                  <div class="col-4">
                    <label for="artistName${painting.id}" class="form-label">Artist Name</label>
                  </div>
                  <div class="col-8">
                    <input type="text" class="form-control" id="artistName${painting.id}" value="${artistName}" disabled>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-4">
                    <label for="theme${painting.id}" class="form-label">Theme</label>
                  </div>
                  <div class="col-8">
                    <input type="text" class="form-control" id="theme${painting.id}" value="${painting.theme}" disabled>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-4">
                    <label for="description${painting.id}" class="form-label">Description</label>
                  </div>
                  <div class="col-8">
                    <textarea class="form-control" id="description${painting.id}" rows="3" disabled>${painting.description}</textarea>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-4">
                    <label for="price${painting.id}" class="form-label">Price $</label>
                  </div>
                  <div class="col-8">
                    <input type="text" class="form-control" id="price${painting.id}" value="${painting.price}" disabled>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-4">
                    <label for="status${painting.id}" class="form-label">Status</label>
                  </div>
                  <div class="col-8">
                    <select class="form-select" id="status${painting.id}" disabled>
                      <option value="available" ${painting.isSold ? '' : 'selected'}>Available</option>
                      <option value="sold" ${painting.isSold ? 'selected' : ''}>Sold</option>
                    </select>
                  </div>
                </div>
                <div class="d-flex flex-column">
                  ${isAdmin
              ? ` 
                        <div class="mb-2">
                          <button class="btn btn-secondary w-100" id="editButton${painting.id}">Edit</button>
                          <button class="btn btn-success w-100 d-none" id="saveButton${painting.id}">Save</button>
                        </div>
                        <button class="btn btn-danger w-100 mb-2" id="deleteButton${painting.id}">Delete</button>
                      `
              : ''
            }
                  <button class="btn btn-primary w-100" id="addToCartButton${painting.id}">Add to Cart</button>
                </div>
              </div>
            </div>
          `;

          paintingContainer.append(card);

          // Edit, Save, Delete Button (Admin only)
          if (isAdmin) {
            $(`#addToCartButton${painting.id}`).hide();
            $(`#editButton${painting.id}`).on('click', function () {
              $(`#artistName${painting.id}, #theme${painting.id}, #description${painting.id}, #price${painting.id}, #status${painting.id}`).prop('disabled', false);
              $(`#editButton${painting.id}`).hide();
              $(`#saveButton${painting.id}`).removeClass('d-none').show();
            });

            $(`#saveButton${painting.id}`).on('click', function () {
              const updatedPainting = {
                id: painting.id,
                name: painting.name,
                artistId: painting.artistId,
                artistName: $(`#artistName${painting.id}`).val(),
                theme: $(`#theme${painting.id}`).val(),
                description: $(`#description${painting.id}`).val(),
                price: parseInt($(`#price${painting.id}`).val(), 10),
                isSold: $(`#status${painting.id}`).val() === 'sold',
                imageUrl: painting.imageUrl
              };

              $.ajax({
                url: `https://localhost:44326/api/Paintings/update-painting/${painting.id}`,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(updatedPainting),
                success: function () {
                  $(`#artistName${painting.id}, #theme${painting.id}, #description${painting.id}, #price${painting.id}, #status${painting.id}`).prop('disabled', true);
                  $(`#editButton${painting.id}`).show();
                  $(`#saveButton${painting.id}`).addClass('d-none').hide();
                },
                error: function (error) {
                  console.error('Error updating painting:', error);
                  alert('Failed to update painting.');
                }
              });
            });

            $(`#deleteButton${painting.id}`).on('click', function () {
              if (confirm('Are you sure you want to delete this painting?')) {
                $.ajax({
                  url: `https://localhost:44326/api/Paintings/delete-painting/${painting.id}`,
                  method: 'DELETE',
                  success: function () {
                    $(`#paintingCard${painting.id}`).remove();
                  },
                  error: function (error) {
                    console.error('Error deleting painting:', error);
                    alert(`Failed to delete painting. Status: ${error.status}`);
                  }
                });
              }
            });
          }
          $(document).on('click', `#addToCartButton${painting.id}`, function () {
            const username = localStorage.getItem('username');
            if (!username) {
                window.location.href = 'loginPage.html';
            } else {
                if (painting.isSold) {
                    alert('This painting is sold and cannot be added to the cart.');
                } else {
                    const cartItem = {
                        productName: painting.name,
                        price: painting.price,
                        quantity: 1
                    };
        
                console.log('Preparing to send AJAX request:', cartItem);
        
                // Send POST request to add the item to the shopping cart
                $.ajax({
                    url: `https://localhost:44326/api/ShoppingCart/AddItem?username=${username}`,
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(cartItem),
                    success: function (data) {
                        console.log('Successfully added item to cart:', data);
                        alert(`${cartItem.productName} added to the cart!`);
                    },
                    error: function (xhr, status, error) {
                        console.error('Error adding item to cart:', xhr.responseText);
                        alert(`Failed to add item to cart: ${xhr.statusText}`);
                    }
                });
              }
            }
        });
        
        });
          // Floating Button for Admin
          if (isAdmin) {
            const floatingButton = document.createElement('button');
            floatingButton.classList.add('btn', 'btn-warning');
            floatingButton.textContent = '+ Add new Painting';
            document.body.appendChild(floatingButton);
            floatingButton.style.position = 'fixed';
            floatingButton.style.bottom = '20px';
            floatingButton.style.right = '20px';
            floatingButton.style.zIndex = '1000';
          
          floatingButton.addEventListener('click', function () {
              const newPaintingCard = `
      <div class="card h-100 mb-3" id="newPaintingCard">
        <div class="card-header">
          <h4>New Painting</h4>
        </div>
        <div class="card-body">
          <div class="row mb-3">
            <div class="col-4">
              <label for="nameNew" class="form-label">Name</label>
            </div>
            <div class="col-8">
              <input type="text" class="form-control" id="nameNew" placeholder="Enter painting name">
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-4">
              <label for="artistNameNew" class="form-label">Artist Name</label>
            </div>
            <div class="col-8">
              <input type="text" class="form-control" id="artistNameNew" placeholder="Enter artist name">
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-4">
              <label for="themeNew" class="form-label">Theme</label>
            </div>
            <div class="col-8">
              <input type="text" class="form-control" id="themeNew" placeholder="Enter painting theme">
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-4">
              <label for="descriptionNew" class="form-label">Description</label>
            </div>
            <div class="col-8">
              <textarea class="form-control" id="descriptionNew" rows="3" placeholder="Enter painting description"></textarea>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-4">
              <label for="priceNew" class="form-label">Price</label>
            </div>
            <div class="col-8">
              <input type="number" class="form-control" id="priceNew" placeholder="Enter price">
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-4">
              <label for="imageUrlNew" class="form-label">Image URL</label>
            </div>
            <div class="col-8">
              <input type="text" class="form-control" id="imageUrlNew" placeholder="Enter image URL">
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-4">
              <label for="statusNew" class="form-label">Status</label>
            </div>
            <div class="col-8">
              <select class="form-select" id="statusNew">
                <option value="available">Available</option>
                <option value="sold">Sold</option>
              </select>
            </div>
          </div>
          <div class="d-flex flex-column">
            <button class="btn btn-success w-100" id="saveNewPaintingButton">Save Painting</button>
          </div>
        </div>
      </div>
    `;

              
              paintingContainer.append(newPaintingCard);

            
              $('#saveNewPaintingButton').on('click', function () {
                const newPaintingData = {
                  Name: $('#nameNew').val(),
                  ArtistName: $('#artistNameNew').val(),
                  Theme: $('#themeNew').val(),
                  Description: $('#descriptionNew').val(),
                  Price: parseInt($('#priceNew').val(), 10),
                  ImageUrl: $('#imageUrlNew').val(),
                  IsSold: $('#statusNew').val() === 'sold',
                  ArtistId: 1
                };

                
                if (!newPaintingData.Name || !newPaintingData.ArtistName || !newPaintingData.Theme || !newPaintingData.Description || isNaN(newPaintingData.Price) || !newPaintingData.ImageUrl) {
                  alert('Please fill in all the fields correctly.');
                  return;
                }

                
                $.ajax({
                  url: 'https://localhost:44326/api/Paintings/add-painting', 
                  method: 'POST',
                  contentType: 'application/json',
                  data: JSON.stringify(newPaintingData),
                  success: function (response) {
                    console.log('New painting added:', response);
                    window.location.reload(); 
                    
                    
                    paintingContainer.prepend(newPaintingCardHTML);
                    $('#newPaintingCard').remove();
                  },
                  error: function (error) {
                    console.error('Error adding painting:', error);
                    alert('Failed to add new painting.');
                  }
                });
              });
            });
          }

      },
      error: function (error) {
        console.error('Error fetching paintings:', error);
      }
    });
  });
});