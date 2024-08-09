document.addEventListener('DOMContentLoaded', function () {
    const volunteersList = document.getElementById('volunteerReportList');
    
    function renderVolunteersReport(data) {
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
  
    async function getVolunteersReport() {
        try {
            const response = await fetch('/api/report/volunteers');
            if (!response.ok) throw new Error('Error fetching history');
            const volunteers = await response.json();
            renderVolunteersReport(volunteers);
        } catch (error) {
            console.error('Error fetching volunteer:', error);
        }
    }
  
    getVolunteersReport();
  });
  
  document.addEventListener('DOMContentLoaded', function () {
    const eventsList = document.getElementById('eventReportList');
    
    function renderEventsReport(data) {
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
  
    async function getEventsReport() {
        try {
            const response = await fetch('/api/report/events');
            if (!response.ok) throw new Error('Error fetching events');
            const events = await response.json();
            renderEventsReport(events);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }
  
    getEventsReport();
  });