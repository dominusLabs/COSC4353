document.addEventListener('DOMContentLoaded', function () {
    const tableData = [
        { notification_date: '2024-06-27', notification_type: 'New Event Posted', notification_message: 'A new event "Community Clean-Up" has been posted.', notification_action: 'View Event'},
        { notification_date: '2024-06-25', notification_type: 'Event Reminder', notification_message: 'Reminder: You have signed up for the "Tree Planting" event on 2024-06-30.', notification_action: 'View Event' },
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
                <td data-label="Date">${row.notification_date}</td>
                <td data-label="Type">${row.notification_type}</td>
                <td data-label="Message">${row.notification_message}</td>
                <td data-label="Action">${row.notification_action}</td>
            `;
            tableBody.appendChild(tr);
        });
    }

    displayTableData(currentPage);
    window.setupPagination(currentPage, tableData, rowsPerPage);
});
