// Define prices for each ticket type
const ticketPrices = {
    adults: 10,
    seniors: 8,
    students: 5,
    kids: 2,
    disability: 2,
    under5: 0,
    members: 0
};

// Initialize ticket counts for each ticket type
let ticketCounts = {
    adults: 0,
    seniors: 0,
    students: 0,
    kids: 0,
    disability: 0,
    under5: 0,
    members: 0
};

// Update the total amount based on the current ticket counts
function updateTotal() {
    let total = 0;

    // Loop through each ticket type and calculate the total
    const ticketTypes = ['adults', 'seniors', 'students', 'kids', 'disability', 'under5', 'members'];

    ticketTypes.forEach(ticketType => {
        const ticketCount = ticketCounts[ticketType];
        total += ticketCount * ticketPrices[ticketType];
    });

    // Update the total amount on the page
    document.getElementById('total-amount').textContent = total;
}

// Function to change the ticket count for a specific ticket type
function updateTicketCount(ticketType, change) {
    // Update the ticket count for the given ticket type
    ticketCounts[ticketType] += change;

    // Ensure the count doesn't go below 0
    if (ticketCounts[ticketType] < 0) {
        ticketCounts[ticketType] = 0;
    }

    // Update the displayed ticket count
    document.getElementById(`${ticketType}-ticket-count`).textContent = ticketCounts[ticketType];

    // Update the total amount
    updateTotal();
}

// Event listener for the purchase button
document.getElementById('purchaseButton').addEventListener('click', function () {
    // Calculate the total amount
    const totalAmount = parseInt(document.getElementById('total-amount').textContent, 10);

    // Check if the total amount is greater than 0 (meaning some tickets were selected)
    if (totalAmount > 0) {
        // Confirm the purchase action
        alert("Thank you for your purchase! Your ticket details have been sent to your email.");   

        // Reset all ticket counts to zero
        for (let type in ticketCounts) {
            ticketCounts[type] = 0;
            document.getElementById(`${type}-ticket-count`).textContent = '0';
        }

        // Reset the total amount to 0
        document.getElementById('total-amount').textContent = '0';
    } else {
        // Alert the user if no tickets have been selected
        alert("Please select at least one ticket to proceed with the purchase.");
    }
});
