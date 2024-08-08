async function getVolunteers() {
    try {
        const response = await fetch('/api/volunteer/all');
        if (!response.ok) throw new Error('Error fetching volunteers');
        const volunteers = await response.json();
        renderVolunteers(volunteers);
    } catch (error) {
        console.error('Error fetching volunteers:', error);
    }
}

function renderVolunteers(data) {
    const volunteersList = document.getElementById('volunteersList');
    volunteersList.innerHTML = '';
    data.forEach(volunteer => {
        const listItem = document.createElement('tr');
        listItem.innerHTML = `
        <td>${volunteer.fullname}</td>
        <td>${volunteer.city}</td>
        <td>${volunteer.state}</td>
        <td>${volunteer.skills}</td>
        <td>${volunteer.availability}</td>
        <td>${volunteer.preferences}</td>
        `;
        volunteersList.appendChild(listItem);
    });
}


document.addEventListener('DOMContentLoaded', function () {
    // Fetch volunteers initially
    getVolunteers();
});
