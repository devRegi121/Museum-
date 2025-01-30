document.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem('username');
    
    if (!username) {
        alert('Username not found. Please log in.');
        return; 
    }

    
    function getCartItems() {
        $.ajax({
            url: `https://localhost:44326/api/ShoppingCart/GetItems?username=${username}`,
            method: 'GET',
            success: function(data) {
                const cartTableBody = document.querySelector('#shopping-cart tbody');
                cartTableBody.innerHTML = ''; 

                if (data.length === 0) {
                    const noItemsRow = document.createElement('tr');
                    noItemsRow.innerHTML = '<td colspan="5">No items in the cart</td>';
                    cartTableBody.appendChild(noItemsRow);
                    return;
                }

                let totalAmount = 0;

                data.forEach(item => {
                    const row = document.createElement('tr');
                    const totalPrice = item.price * item.quantity;
                    totalAmount += totalPrice;

                    row.innerHTML = `
                        <td>${item.productName}</td>
                        <td>$${item.price}</td>
                        <td><input type="number" value="${item.quantity}" class="quantity-input" data-item-id="${item.id}" min="1"></td>
                        <td>$${totalPrice.toFixed(2)}</td>
                        <td>
                            <button class="remove-btn" data-item-id="${item.id}">Remove</button>
                           
                        </td>
                    `;
                    cartTableBody.appendChild(row);
                });

               
                document.getElementById('total-amount').textContent = `Total: $${totalAmount.toFixed(2)}`;
            },
            error: function(xhr, status, error) {
                console.error('Error fetching cart items:', error);
                
            }
        });
    }

    function removeCartItem(itemId) {
        $.ajax({
            url: `https://localhost:44326/api/ShoppingCart/RemoveItem?id=${itemId}&username=${username}`,
            method: 'DELETE',
            success: function(data) {
                if (data === "Item removed from the cart successfully.") {
                    const rowToRemove = $(`button[data-item-id="${itemId}"]`).closest('tr');
                    if (rowToRemove.length) {
                        rowToRemove.remove();
                    }
                    
                    getCartTotal();
                } else {
                    alert('Failed to remove item from the cart.');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error removing item from cart:', error);
                alert('Failed to remove item from cart.');
            }
        });
    }

   
    document.querySelector('#shopping-cart').addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-btn')) {
            const itemId = event.target.getAttribute('data-item-id');
            removeCartItem(itemId); 
        }
    });
    
    function getCartTotal() {
        $.ajax({
            url: `https://localhost:44326/api/ShoppingCart/GetTotal?username=${username}`,
            method: 'GET',
            success: function(data) {
                $('#total-amount').text(`Total: $${data.TotalAmount.toFixed(2)}`);
            },
            error: function(xhr, status, error) {
                console.error('Error fetching total amount:', error);
                alert('Failed to update total amount.');
            }
        });
    }

    
    document.getElementById('checkout-btn').addEventListener('click', function () {
        const username = localStorage.getItem('username'); 
    
        if (!username) {
            alert('You must be logged in to complete the purchase.');
            return;
        }
    
        
        $.ajax({
            url: `https://localhost:44326/api/ShoppingCart/ClearCart?username=${username}`,
            method: 'DELETE', 
            success: function (data) {

                const cartTableBody = document.querySelector('#shopping-cart tbody');
                cartTableBody.innerHTML = '';
                document.getElementById('total-amount').textContent = 'Total: $0.00';
    
            
            },
            error: function (xhr, status, error) {
                console.error('Error clearing cart:', xhr.responseText);
                alert('Failed to complete the purchase. Please try again later.');
            }
        });
    });
    
    getCartItems();
});
