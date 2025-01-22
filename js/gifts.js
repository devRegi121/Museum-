document.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem('username');
    const userRole = localStorage.getItem('role')?.toLowerCase();

    console.log('Username:', username);
    console.log('Role:', userRole);

    // DOM Elements
    const userGreeting = document.getElementById('userGreeting');
    const greetingMessage = document.getElementById('greetingMessage');
    const showProfileBtn = document.getElementById('showProfileBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const cartBtn = document.getElementById('cartBtn');

    // Manage User Authentication Status
    if (userRole === 'user' || userRole === 'admin') {
        // User is logged in
        if (userGreeting) userGreeting.style.display = 'inline-block';
        if (greetingMessage) greetingMessage.textContent = `Hello, ${username}`;
        if (logoutBtn) logoutBtn.style.display = 'inline-block';
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (cartBtn && userRole === 'user') cartBtn.style.display = 'inline-block';

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

    $(document).ready(function () {
        // Fetch Gifts Data
        $.ajax({
            url: 'https://localhost:44326/api/Gift/get-all-gifts',
            method: 'GET',
            success: function (data) {
                const giftsCardContainer = $('.GiftsCard .row');
                const isAdmin = userRole === 'admin';
                data.forEach(gift => {
                    const giftCode = gift.code || 'N/A';
                    const giftPrice = gift.price || 'N/A';
                    const card = `
                        <div class="col">
    <div class="card">
        <img src="${gift.image || 'default.jpg'}" class="d-block w-100" alt="${gift.name}">
        <div class="card-body">
            <h5 class="card-title">${gift.name}</h5>
            <div class="d-flex flex-column align-items-start">
                <span class="code-info">Code: ${giftCode}</span>
                <span class="price-info mt-2">$${giftPrice}</span>
            </div>
            <div class="d-flex flex-column mt-3">
                ${isAdmin
                            ?
                            `<button class="btn btn-secondary mb-2" id="editButton${gift.id}">Edit</button>
                    <button class="btn btn-success d-none mb-2" id="saveButton${gift.id}">Save</button>
                    <button class="btn btn-danger mb-2" id="deleteButton${gift.id}">Delete</button>`
                            : ''
                        }
                 <button class="btn btn-primary" id="addToCartButton${gift.id}">Add to Cart</button>
             </div>
         </div>
     </div>
 </div>
                    `;

                    giftsCardContainer.append(card);

                    // Add functionality for edit, save, delete buttons if admin
                    if (isAdmin) {
                        cartBtn.style.display = 'none';

                        $(`#editButton${gift.id}`).on('click', function () {
                            $(this).addClass('d-none');
                            $(`#saveButton${gift.id}`).removeClass('d-none');

                            // Make fields editable
                            const cardBody = $(this).closest('.card-body');
                            const title = cardBody.find('.card-title');
                            const codeInfo = cardBody.find('.code-info');
                            const priceInfo = cardBody.find('.price-info');
                            const urlInfo = cardBody.find('.url-info');

                            // Make fields editable
                            title.attr('contenteditable', 'true').addClass('editable');
                            codeInfo.attr('contenteditable', 'true').addClass('editable');
                            priceInfo.attr('contenteditable', 'true').addClass('editable');
                            urlInfo.attr('contenteditable', 'true').addClass('editable');
                        });

                        // Save button click handler
                        $(`#saveButton${gift.id}`).on('click', function () {
                            const cardBody = $(this).closest('.card-body');
                            const title = cardBody.find('.card-title');
                            const codeInfo = cardBody.find('.code-info');
                            const priceInfo = cardBody.find('.price-info');
                            const urlInfo = cardBody.find('.url-info'); // URL field

                            // Extract updated values
                            const updatedName = title.text().trim();
                            const updatedCode = codeInfo.text().replace('Code: ', '').trim();
                            const updatedPrice = parseFloat(priceInfo.text().replace('$', '').trim());
                            const updatedUrl = urlInfo.text().trim();  // Get the updated URL

                            // Prepare updated gift data
                            const updatedGift = {
                                id: gift.id,
                                name: updatedName,
                                code: updatedCode,
                                price: updatedPrice,
                                url: updatedUrl
                            };

                            // Send updated data to the server
                            $.ajax({
                                url: `https://localhost:44326/api/Gift/update-gift-by-id/${gift.id}`,
                                method: 'PUT',
                                contentType: 'application/json',
                                data: JSON.stringify(updatedGift),
                                success: function () {
                                    $(`#editButton${gift.id}`).removeClass('d-none');
                                    $(`#saveButton${gift.id}`).addClass('d-none');

                                    // Make fields non-editable
                                    title.attr('contenteditable', 'false').removeClass('editable');
                                    codeInfo.attr('contenteditable', 'false').removeClass('editable');
                                    priceInfo.attr('contenteditable', 'false').removeClass('editable');
                                    urlInfo.attr('contenteditable', 'false').removeClass('editable');
                                },
                                error: function (error) {
                                    console.error('Error updating gift:', error);
                                    alert('Failed to update gift.');
                                }
                            });
                        });
                    }

                    console.log('User Role:', userRole); // Should output 'admin' for admins
                    console.log('Is Admin:', isAdmin); // Should output true for admins

                    if (isAdmin) {
                        console.log('Admin user detected. Appending Add New Gift Button.');
                        const addGiftButton = `
                            <button class="btn btn-warning" id="addNewGiftButton" style="position: fixed; bottom: 20px; right: 20px; z-index: 1000;">
                                + Add New Gift
                            </button>`;
                        $('body').append(addGiftButton);
                        H


                        $(document).on('click', '#addNewGiftButton', function () {

                            const newGiftCard = `
                                <div class="col new-gift-card">
                                    <div class="card">
                                        <div class="card-body">
                                            <input type="text" class="form-control mb-2 gift-name" placeholder="Gift Name">
                                            <input type="text" class="form-control mb-2 gift-code" placeholder="Gift Code">
                                            <input type="number" class="form-control mb-2 gift-price" placeholder="Gift Price">
                                            <input type="text" class="form-control mb-2 gift-url" placeholder="Gift URL">
                                            <button class="btn btn-success save-new-gift">Save</button>
                                            <button class="btn btn-danger cancel-new-gift">Cancel</button>
                                        </div>
                                    </div>
                                </div>`;
                            $('.GiftsCard .row').prepend(newGiftCard);
                        });


                        $(document).on('click', '.cancel-new-gift', function () {
                            $(this).closest('.new-gift-card').remove();
                        });

                        // Use delegated event binding for save button
                        $(document).on('click', '.save-new-gift', function () {
                            const cardBody = $(this).closest('.card-body');
                            const newGiftName = cardBody.find('.gift-name').val();
                            const newGiftCode = parseInt(cardBody.find('.gift-code').val(), 10);  // Ensure the code is an integer
                            const newGiftPrice = parseFloat(cardBody.find('.gift-price').val());
                            const newGiftUrl = cardBody.find('.gift-url').val();

                            // Validate form data
                            if (!newGiftName || isNaN(newGiftCode) || isNaN(newGiftPrice) || !newGiftUrl) {
                                alert('Please fill in all fields correctly.');
                                return;
                            }


                            const newGift = {
                                name: newGiftName,
                                code: newGiftCode,
                                price: newGiftPrice,
                                url: newGiftUrl
                            };

                            // Send new gift data to the server
                            $.ajax({
                                url: 'https://localhost:44326/api/Gift/add-gift',
                                method: 'POST',
                                contentType: 'application/json',
                                data: JSON.stringify(newGift),
                                success: function () {
                                    alert('New gift added successfully!');
                                    window.location.reload();
                                },
                                error: function (error) {
                                    console.error('Error adding new gift:', error);
                                    alert('Failed to add new gift.');
                                }
                            });
                        });
                    }

                    if (isAdmin) {
                        cartBtn.style.display = 'none';


                        $(`#deleteButton${gift.id}`).on('click', function () {
                            if (confirm(`Are you sure you want to delete the gift: ${gift.name}?`)) {
                                // Send DELETE request to the server
                                $.ajax({
                                    url: `https://localhost:44326/api/Gift/delete-gift-by-id/${gift.id}`,
                                    method: 'DELETE',
                                    success: function () {
                                        alert('Gift deleted successfully!');
                                        $(`#deleteButton${gift.id}`).closest('.col').remove();
                                    },
                                    error: function (error) {
                                        console.error('Error deleting gift:', error);
                                        alert('Failed to delete gift.');
                                    }
                                });
                            }
                        });
                    }




                    $(`#addToCartButton${gift.id}`).on('click', function () {
                        const username = localStorage.getItem('username');  // Ensure username is fetched inside the click handler

                        // Prepare the cart item object
                        const cartItem = {
                            productName: gift.name,
                            price: gift.price,
                            quantity: 1,  // Default quantity is 1, you can modify if needed
                        };

                        console.log('Adding to cart:', cartItem);  // Log the payload to check if it's correct

                        // Send POST request to add the item to the shopping cart
                        $.ajax({
                            url: `https://localhost:44326/api/ShoppingCart/AddItem?username=${username}`,  // Pass username as query param
                            method: 'POST',
                            contentType: 'application/json',
                            data: JSON.stringify(cartItem),  // Send the cart item as JSON
                            success: function (data) {
                                console.log('Successfully added item to cart:', data);
                                alert(`${cartItem.productName} added to the cart!`);
                            },
                            error: function (xhr, status, error) {
                                // Log error response for debugging
                                console.error('Error adding item to cart:', xhr.responseText);
                                alert(`Failed to add item to cart: ${xhr.statusText}`);
                            }
                        });

                    });


                });
            }
        });
    });
});
