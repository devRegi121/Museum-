
    const bookingForm = document.getElementById('bookingForm');
    const eventDropdown = document.getElementById('event');
    const dateInput = document.getElementById('date');
    const message = document.getElementById('message');

    // Event date ranges
    const eventDates = {
        "Silk Roads": { start: "2024-09-26", end: "2025-02-23" },
        "Hew Locke Exhibition": { start: "2024-10-17", end: "2025-02-09" },
        "Picasso": { start: "2024-11-07", end: "2025-03-30" },
        "Impressionism": { start: "2025-02-01", end: "2025-02-15" },
        "European Textile Collection": { start: "2025-02-10", end: "2025-02-25" },
        "Van Gogh’s Vision": { start: "2025-03-05", end: "2025-03-19" }
    };

    // Update the date input based on selected event
    eventDropdown.addEventListener('change', () => {
        const selectedEvent = eventDropdown.value;

        if (eventDates[selectedEvent]) {
            const { start, end } = eventDates[selectedEvent];
            dateInput.min = start;
            dateInput.max = end;
            dateInput.value = ""; // Reset the date field if event changes
            dateInput.disabled = false;
        } else {
            dateInput.min = "";
            dateInput.max = "";
            dateInput.disabled = true;
        }
    });

    // Handle form submission
    bookingForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            surname: document.getElementById('surname').value,
            event: document.getElementById('event').value,
            date: document.getElementById('date').value,
            adults: document.getElementById('adults').value,
            kids: document.getElementById('kids').value,
            card: document.getElementById('card').value
        };

        // Save form data to local storage
        localStorage.setItem('bookingData', JSON.stringify(formData));

        message.textContent = 'Your booking has been saved successfully!';
        bookingForm.reset();
        dateInput.disabled = true; // Disable date input after reset
    });

    // Disable date input by default until an event is selected
    dateInput.disabled = true;

