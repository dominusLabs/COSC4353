document.addEventListener('DOMContentLoaded', function () {
    const tableData = [
        { eventName: 'Community Cleanup', eventDescription: 'A community-wide effort to clean up local parks and streets.', location: 'Central Park', requiredSkills: ['Teamwork', 'Physical Labor'], urgency: 'High', eventDate: '2023-05-15', participated: 'Yes' },
        { eventName: 'Food Drive', eventDescription: 'Collecting and distributing food to the needy.', location: 'Community Center', requiredSkills: ['Organization', 'Communication'], urgency: 'Medium', eventDate: '2023-06-20', participated: 'No' },
    ];

    const rowsPerPage = 5;
    let currentPage = 1;

    function displayTableData(page) {
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';
        const startIndex = (page - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        const paginatedData = tableData.slice(startIndex, endIndex);

        paginatedData.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td data-label="Event Name">${row.eventName}</td>
                <td data-label="Event Description">${row.eventDescription}</td>
                <td data-label="Location">${row.location}</td>
                <td data-label="Required Skills">${row.requiredSkills.map(skill => `<span class="tag">${skill}</span>`).join('')}</td>
                <td data-label="Urgency">${row.urgency}</td>
                <td data-label="Event Date">${row.eventDate}</td>
                <td data-label="Participated">${row.participated}</td>
            `;
            tableBody.appendChild(tr);
        });
    }

    displayTableData(currentPage);
    window.setupPagination(currentPage, tableData, rowsPerPage);
});
