document.addEventListener('DOMContentLoaded', function() {
    const eventTableBody = document.getElementById('eventTableBody');
    const events = [
        {
            name: "Community Cleanup",
            description: "Cleaning the local park",
            location: "City Park",
            date: "2023-04-20"
        },
        {
            name: "Food Drive",
            description: "Collecting and distributing food",
            location: "Community Center",
            date: "2023-05-10"
        },
        {
            name: "Charity Run",
            description: "Organizing a 5K run for charity",
            location: "Downtown",
            date: "2023-06-15"
        }
    ];

    // Function to render table rows
    function renderTableRows(events) {
        eventTableBody.innerHTML = '';
        events.forEach(event => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td data-label="Event Name">${event.name}</td>
                <td data-label="Event Description">${event.description}</td>
                <td data-label="Location">${event.location}</td>
                <td data-label="Event Date">${event.date}</td>
            `;
            eventTableBody.appendChild(row);
        });
    }

    // Render the hard-coded events
    renderTableRows(events);
});
