const bookingForm = document.getElementById('bookingForm');
const eventDropdown = document.getElementById('event');
const dateInput = document.getElementById('date');
const message = document.getElementById('message');

const eventDates = {
    "Silk Roads": { start: "2024-09-26", end: "2025-02-23" },
    "Hew Locke Exhibition": { start: "2024-10-17", end: "2025-02-09" },
    "Picasso": { start: "2024-11-07", end: "2025-03-30" },
    "Impressionism": { start: "2025-02-01", end: "2025-02-15" },
    "European Textile Collection": { start: "2025-02-10", end: "2025-02-25" },
    "Van Gogh’s Vision": { start: "2025-03-05", end: "2025-03-19" }
};

eventDropdown.addEventListener('change', () => {
    const selectedEvent = eventDropdown.value;

    if (eventDates[selectedEvent]) {
        const { start, end } = eventDates[selectedEvent];
        dateInput.min = start;
        dateInput.max = end;
        dateInput.value = ""; 
        dateInput.disabled = false;
    } else {
        dateInput.min = "";
        dateInput.max = "";
        dateInput.disabled = true;
    }
});

bookingForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        Name: document.getElementById('name').value,
        Surname: document.getElementById('surname').value,
        Event: document.getElementById('event').value,
        Date: document.getElementById('date').value,
        Card: document.getElementById('card').value,
        Adults: parseInt(document.getElementById('adults').value),
        Kids: parseInt(document.getElementById('kids').value)
    };

    if (!formData.Name || !formData.Surname || !formData.Event || !formData.Date || !formData.Card) {
        message.textContent = "Please fill in all required fields.";
        message.style.color = "red";
        return;
    }

    try {
        const response = await fetch('https://localhost:44326/api/Booking/create', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json(); 
        message.textContent = data.message; 
        message.style.color = "green";
        bookingForm.reset();
        dateInput.disabled = true; 

        setTimeout(() => {
            message.textContent = ""; 
        }, 3000);
    } catch (error) {
        console.error("Error submitting booking:", error); 
        message.textContent = error.message;
        message.style.color = "red";

        setTimeout(() => {
            message.textContent = ""; 
        }, 3000);
    }
});


dateInput.disabled = true;
