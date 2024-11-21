
// Ticket prices
const ticketPrices = {
    adults: 10,
    seniors: 80,
    students:5,
    kids:2,
    disability:2,
    children:0,
    members:0
};

// Ticket counts
const ticketCounts = {
    adults: 0,
    seniors: 0,
    students:0,
    kids:0,
    disability:0,
    children:0,
    members:0
};

// Update ticket count and total amount
function updateTicketCount(type, change) {
    ticketCounts[type] = Math.max(0, ticketCounts[type] + change);
    document.getElementById(`${type}-ticket-count`).innerText = ticketCounts[type];
    updateTotalAmount();
}

// Calculate and update total amount
function updateTotalAmount() {
    const total = (ticketCounts.general * ticketPrices.general) +
        (ticketCounts.vip * ticketPrices.vip);
    document.getElementById('total-amount').innerText = total;
}

// Handle pay button click
function payNow() {
    alert(`Your total is $${document.getElementById('total-amount').innerText}. Proceed to payment.`);
}