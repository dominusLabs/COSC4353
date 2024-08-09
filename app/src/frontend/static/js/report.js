document.addEventListener('DOMContentLoaded', function () {
    const eventsList = document.getElementById('eventsList');
    const volunteersList = document.getElementById('volunteersList');
    
    async function getReports(type, query = '') {
        try {
            const response = await fetch(`/api/report/${type}?${query}`);
            if (!response.ok) throw new Error('Error fetching reports');
            const data = await response.json();
            
            console.log(`Fetched ${type} data:`, data);
            
            if (type === 'events') {
                renderEvents(data);
            } else if (type === 'volunteers') {
                renderVolunteers(data);
            }
        } catch (error) {
            console.error(`Error fetching ${type}:`, error);
        }
    }
    
    function renderEvents(data) {
        eventsList.innerHTML = '';
        data.forEach(event => {
            const listItem = document.createElement('tr');
            listItem.innerHTML = `
                <td>${event.events.name}</td>
                <td>${event.events.description}</td>
                <td>${event.events.required_skills.join(', ')}</td>
                <td>${event.events.location}</td>
                <td>${event.events.urgency}</td>
                <td>${new Date(event.events.date).toLocaleDateString()}</td>
                <td>${event.profile.fullname}</td>
                <td>${event.participation_status}</td>
            `;
            eventsList.appendChild(listItem);
        });
    }
    
    function renderVolunteers(data) {
        volunteersList.innerHTML = '';
        data.forEach(volunteer => {
            const listItem = document.createElement('tr');
            listItem.innerHTML = `
                <td>${volunteer.profile.fullname}</td>
                <td>${volunteer.events.name}</td>
                <td>${volunteer.events.description}</td>
                <td>${volunteer.events.required_skills.join(', ')}</td>
                <td>${volunteer.events.location}</td>
                <td>${volunteer.events.urgency}</td>
                <td>${new Date(volunteer.events.date).toLocaleDateString()}</td>
                <td>${volunteer.participation_status}</td>
            `;
            volunteersList.appendChild(listItem);
        });
    }
    
    // Example: Fetch reports on page load
    getReports('events'); // Or 'volunteers'
    
    // You can add event listeners to search inputs and call `getReports` with appropriate query parameters
});
