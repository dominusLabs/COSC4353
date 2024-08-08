document.addEventListener('DOMContentLoaded', function () {
  const historyList = document.getElementById('historyList');

  function renderHistory(data) {
      historyList.innerHTML = '';
      data.forEach(event => {
          const listItem = document.createElement('tr');
          listItem.innerHTML = `
              <td>${event.profile.fullname}</td>
              <td>${event.events.name}</td>
              <td>${event.events.description}</td>
              <td>${event.events.location}</td>
              <td>${event.events.required_skills.join(', ')}</td>
              <td>${event.events.urgency}</td>
              <td>${new Date(event.events.date).toLocaleDateString()}</td>
              <td>${event.participation_status}</td>
          `;
          historyList.appendChild(listItem);
      });
  }

  async function getHistory() {
      try {
          const response = await fetch('/api/history/all');
          if (!response.ok) throw new Error('Error fetching history');
          const events = await response.json();
          renderHistory(events);
      } catch (error) {
          console.error('Error fetching events:', error);
      }
  }

  // Fetch history initially
  getHistory();
});
