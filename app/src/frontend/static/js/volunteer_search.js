document.addEventListener('DOMContentLoaded', function () {
    const tableData = [
        { name: 'John Doe', email: 'john.doe@example.com', phone: '(123) 456-7890', skills: ['Teamwork', 'Physical Labor'], registeredDate: '2023-05-15' },
        { name: 'Jane Doe', email: 'jane.doe@example.com', phone: '(123) 456-7890', skills: ['Organization', 'Communication'], registeredDate: '2023-06-20' },
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
                <td data-label="Volunteer Name">${row.name}</td>
                <td data-label="Email">${row.email}</td>
                <td data-label="Phone">${row.phone}</td>
                <td data-label="Skills">${row.skills.map(skill => `<span class="tag">${skill}</span>`).join('')}</td>
                <td data-label="Registered Date">${row.registeredDate}</td>
            `;
            tableBody.appendChild(tr);
        });
    }

    displayTableData(currentPage);
    window.setupPagination(currentPage, tableData, rowsPerPage);
});
