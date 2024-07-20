document.addEventListener('DOMContentLoaded', function () {
    const volunteers = [
        {
            name: "John Doe",
            email: "johndoe@example.com",
            phone: "123-456-7890",
            skills: "Carpentry, Plumbing",
            registeredDate: "2024-01-15"
        },
        {
            name: "Jane Smith",
            email: "janesmith@example.com",
            phone: "987-654-3210",
            skills: "Cooking, First Aid",
            registeredDate: "2024-03-22"
        },
        {
            name: "Emily Johnson",
            email: "emilyj@example.com",
            phone: "555-123-4567",
            skills: "Teaching, Childcare",
            registeredDate: "2024-05-10"
        },
        {
            name: "Michael Brown",
            email: "michaelb@example.com",
            phone: "444-987-6543",
            skills: "Electrician, Painting",
            registeredDate: "2024-02-08"
        }
    ];

    const tableBody = document.getElementById('tableBody');

    function renderTable(data) {
        tableBody.innerHTML = "";
        data.forEach(volunteer => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${volunteer.name}</td>
                <td>${volunteer.email}</td>
                <td>${volunteer.phone}</td>
                <td>${volunteer.skills}</td>
                <td>${volunteer.registeredDate}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    function filterVolunteers(query) {
        const filtered = volunteers.filter(volunteer => {
            return volunteer.name.toLowerCase().includes(query.toLowerCase()) ||
                volunteer.email.toLowerCase().includes(query.toLowerCase()) ||
                volunteer.phone.includes(query) ||
                volunteer.skills.toLowerCase().includes(query.toLowerCase());
        });
        renderTable(filtered);
    }

    document.getElementById('searchInput').addEventListener('input', function () {
        const query = this.value;
        filterVolunteers(query);
    });

    renderTable(volunteers);
});
