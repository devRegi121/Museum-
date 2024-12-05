document.addEventListener('DOMContentLoaded', () => {
    const visitDate = document.getElementById('visitDate');
    const calendarInput = document.getElementById('calendarInput');
    const visitorDropdown = document.getElementById('whoIsVisiting');
    const eventDropdown = document.getElementById('whatTheySee');
    const clearFiltersButton = document.getElementById('clearFilters');

    // Event listener for the date dropdown
    visitDate.addEventListener('change', () => {
        if (visitDate.value === 'select_date') {
            calendarInput.classList.remove('d-none');  // Show calendar input
            calendarInput.focus();
        } else {
            calendarInput.classList.add('d-none');  // Hide calendar input
            filterExhibitions();
        }
    });

    // Event listeners for filtering
    [calendarInput, visitorDropdown, eventDropdown].forEach(element => {
        element.addEventListener('change', filterExhibitions);
    });

    function filterExhibitions() {
        const selectedDate = calendarInput.value;  // Format: YYYY-MM-DD
        const selectedVisitor = visitorDropdown.value.toLowerCase();
        const selectedEvent = eventDropdown.value.toLowerCase();

        const exhibitions = document.querySelectorAll('.exhibition');
        
        exhibitions.forEach(exhibition => {
            const startDate = exhibition.getAttribute('data-start-date');
            const endDate = exhibition.getAttribute('data-end-date');
            const visitorType = exhibition.getAttribute('data-visitor-type').toLowerCase();
            const eventType = exhibition.getAttribute('data-event-type').toLowerCase();

            // Date match
            let dateMatch = true;
            if (selectedDate) {
                // Ensure consistent date format for comparison
                dateMatch = (selectedDate >= startDate) && (selectedDate <= endDate);
            }

            // Visitor and event matches
            const visitorMatch = (selectedVisitor === 'choose') || visitorType.includes(selectedVisitor);
            const eventMatch = (selectedEvent === 'choose') || eventType.includes(selectedEvent);

            // Show or hide exhibition based on filters
            exhibition.style.display = (dateMatch && visitorMatch && eventMatch) ? 'flex' : 'none';
        });

        // Toggle clear button visibility
        toggleClearButton();
    }

    function toggleClearButton() {
        const isAnyFilterSelected = (
            visitDate.value !== 'Choose' ||
            visitorDropdown.value !== 'Choose' ||
            eventDropdown.value !== 'Choose' ||
            calendarInput.value
        );
        clearFiltersButton.classList.toggle('d-none', !isAnyFilterSelected);
    }

    // Clear Filters Button
    clearFiltersButton.addEventListener('click', () => {
        visitDate.selectedIndex = 0;
        visitorDropdown.selectedIndex = 0;
        eventDropdown.selectedIndex = 0;
        calendarInput.value = '';
        calendarInput.classList.add('d-none');

        document.querySelectorAll('.exhibition').forEach(exhibition => {
            exhibition.style.display = 'flex';  // Show all exhibitions
        });

        clearFiltersButton.classList.add('d-none');  // Hide the button
    });
});