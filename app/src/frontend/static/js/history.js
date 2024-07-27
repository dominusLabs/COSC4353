document.addEventListener('DOMContentLoaded', function () {
  const historyList = document.getElementById('historyList');

  function renderHistory(data) {
      historyList.innerHTML = '';
      data.forEach(event => {
          const listItem = document.createElement('tr');
          listItem.innerHTML = `
              <td>${event.id}</td>
              <td>${new Date(event.created_at).toLocaleString()}</td>
              <td>${event.user_id}</td>
              <td>${event.event_id}</td>
              <td>${event.participation_status}</td>
              <td>
                  <button class="btn btn-danger btn-sm" onclick="deleteEvent('${event.id}', this)">Delete</button>
              </td>
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

  async function deleteEvent(eventId, button) {
      try {
          const response = await fetch(`/api/history/${eventId}`, {
              method: 'DELETE',
          });
          if (!response.ok) throw new Error('Error deleting event');
          button.closest('tr').remove();
      } catch (error) {
          console.error('Error deleting event:', error);
      }
  }

  // Fetch history initially
  getHistory();
});
