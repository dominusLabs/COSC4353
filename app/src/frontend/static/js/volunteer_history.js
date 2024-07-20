document.addEventListener('DOMContentLoaded', function () {
    const volunteerHistory = [
        {
            eventName: "Community Clean-Up",
            eventDescription: "Cleaning up the local park.",
            location: "Central Park",
            requiredSkills: "Gardening, Coordination",
            urgency: "Medium",
            eventDate: "2024-06-15",
            participated: "Yes"
        },
        {
            eventName: "Food Drive",
            eventDescription: "Organizing and distributing food to the needy.",
            location: "Community Center",
            requiredSkills: "Cooking, Organizing",
            urgency: "High",
            eventDate: "2024-05-10",
            participated: "Yes"
        },
        {
            eventName: "Tech Workshop",
            eventDescription: "Teaching basic computer skills.",
            location: "Library",
            requiredSkills: "Teaching, IT Support",
            urgency: "Low",
            eventDate: "2024-04-22",
            participated: "No"
        },
        {
            eventName: "Blood Donation Camp",
            eventDescription: "Assisting with the organization of a blood donation camp.",
            location: "Hospital",
            requiredSkills: "First Aid, Coordination",
            urgency: "High",
            eventDate: "2024-03-18",
            participated: "Yes"
        }
    ];

    const tableBody = document.getElementById('tableBody');

    function renderTable(data) {
        tableBody.innerHTML = "";
        data.forEach(event => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${event.eventName}</td>
                <td>${event.eventDescription}</td>
                <td>${event.location}</td>
                <td>${event.requiredSkills}</td>
                <td>${event.urgency}</td>
                <td>${event.eventDate}</td>
                <td>${event.participated}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    renderTable(volunteerHistory);
});
