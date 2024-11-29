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
    let total = 0;
    const ticketTypes = ['adults', 'seniors', 'students', 'kids', 'disability', 'under5', 'members'];
    ticketTypes.forEach(ticketType => {
        const ticketCount = ticketCounts[ticketType];
        total += ticketCount * ticketPrices[ticketType];
    });
    document.getElementById('total-amount').textContent = total;
}

function updateTicketCount(ticketType, change) {
    ticketCounts[ticketType] += change;
    if (ticketCounts[ticketType] < 0) {
        ticketCounts[ticketType] = 0;
    }
    document.getElementById(`${ticketType}-ticket-count`).textContent = ticketCounts[ticketType];
    updateTotal();
}

document.getElementById('purchaseButton').addEventListener('click', function () {
    const totalAmount = parseInt(document.getElementById('total-amount').textContent, 10);
    const email = document.getElementById('floatingInput').value;
    const selectedDate = document.querySelector('input[type="date"]').value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.id;

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

    const ticketDetails = {
        date: selectedDate,
        tickets: { ...ticketCounts },
        email: email,
        paymentMethod: paymentMethod,
        totalAmount: totalAmount
    };
    localStorage.setItem('ticketDetails', JSON.stringify(ticketDetails));

    alert("Thank you for your purchase! Your ticket details have been sent to your email.");

    for (let type in ticketCounts) {
        ticketCounts[type] = 0;
        document.getElementById(`${type}-ticket-count`).textContent = '0';
    }
    document.getElementById('total-amount').textContent = '0';
    document.getElementById('floatingInput').value = '';
    document.querySelector('input[type="date"]').value = '';
    document.querySelector('input[name="paymentMethod"]:checked').checked = false;
});


