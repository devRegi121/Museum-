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

    if (userRole === 'Admin') {
        const floatingButton = document.createElement('button');
        floatingButton.classList.add('btn', 'btn-warning');
        floatingButton.textContent = 'Admin Panel';
        document.body.appendChild(floatingButton);
        floatingButton.style.position = 'fixed';
        floatingButton.style.bottom = '20px';
        floatingButton.style.right = '20px';
        floatingButton.style.zIndex = '1000';
    
        floatingButton.addEventListener('click', function () {
            
            window.location.href = 'ticketAdmin.html';  
        });
    }
    

const ticketPrices = {
    adults: 10,
    seniors: 8,
    students: 5,
    kids: 2,
    disability: 2,
    under5: 0,
    members: 0
};

let ticketCounts = {
    adults: 0,
    seniors: 0,
    students: 0,
    kids: 0,
    disability: 0,
    under5: 0,
    members: 0
};

function updateTotal() {
    if (!ticketPrices || !ticketCounts) {
        console.error('ticketPrices or ticketCounts is undefined');
        return;
    }
    let total = 0;
    for (const [key, count] of Object.entries(ticketCounts)) {
        total += count * (ticketPrices[key] || 0);
    }
    $('#total-amount').text(total);
}

function updateTicketCount(ticketType, change) {
    ticketCounts[ticketType] = Math.max(0, ticketCounts[ticketType] + change);
    $(`#${ticketType}-ticket-count`).text(ticketCounts[ticketType]);
    updateTotal();
}

// Handle membership button clicks
$(document).on('click', '.btn-primary', function (event) {
    event.preventDefault();
    const selectedMembershipType = $(this).data('membership-type');
    localStorage.setItem('selectedMembershipType', selectedMembershipType);
    alert(`Membership Type Selected: ${selectedMembershipType}`);
});

$('#purchaseButton').on('click', function () {
    const totalAmount = parseInt($('#total-amount').text(), 10);
    const email = $('#email').val();
    const selectedDate = $('#visitDate').val();
    const paymentMethod = $('input[name="paymentMethod"]:checked').val();
    const membershipPlan = localStorage.getItem('selectedMembershipType') || 'None';

    // Validation checks
    if (!selectedDate) {
        alert("Please select a date for your visit.");
        return;
    }
    if (!email) {
        alert("Please enter a valid email address.");
        return;
    }
    if (!paymentMethod) {
        alert("Please select a payment method.");
        return;
    }
    if (totalAmount <= 0) {
        alert("Please select at least one ticket to proceed with the purchase.");
        return;
    }

    const tickets = getTicketDetails();
    if (tickets.length === 0) {
        alert("Please select at least one type of ticket.");
        return;
    }

    const ticketDetails = {
        tickets: tickets,
        visitDate: selectedDate,
        email: email,
        paymentMethod: paymentMethod,
        totalAmount: totalAmount,
        membershipPlan: membershipPlan
    };

    $.ajax({
        url: 'https://localhost:44326/api/Ticket/add-ticket',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(ticketDetails),
        success: function () {
            alert("Thank you for your purchase! Your ticket details have been sent to your email.");
            resetForm();
        },
        error: function (response) {
            const errorMessage = response.responseText || "An error occurred while processing your purchase.";
            alert(`Failed to complete purchase: ${errorMessage}`);
        }
    });
});

function getTicketDetails() {
    const tickets = [];
    for (let type in ticketCounts) {
        if (ticketCounts[type] > 0) {
            tickets.push({
                TicketType: type,
                Quantity: ticketCounts[type],
                Price: ticketPrices[type],
            });
        }
    }
    return tickets;
}

function resetForm() {
    for (let type in ticketCounts) {
        ticketCounts[type] = 0;
        $(`#${type}-ticket-count`).text('0');
    }
    $('#total-amount').text('0');
    $('#email').val('');
    $('#visitDate').val('');
    $('input[name="paymentMethod"]').prop('checked', false);
    localStorage.removeItem('selectedMembershipType');
}
