document.addEventListener('DOMContentLoaded', function () {
  const eventList = document.getElementById('eventList');

  // Fetch and display all events on page load
  fetch('/api/event/all')
      .then(response => response.json())
      .then(events => {
          if (!events || events.length === 0) {
              console.log('No events found.');
              return;
          }
          events.forEach(event => {
              const listItem = document.createElement('li');
              listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
              listItem.textContent = event.name;
              const deleteButton = document.createElement('button');
              deleteButton.className = 'btn btn-danger btn-sm';
              deleteButton.textContent = 'Delete';
              deleteButton.onclick = () => deleteEvent(event.event_id, listItem);
              listItem.appendChild(deleteButton);
              eventList.appendChild(listItem);
          });
      })
      .catch(error => console.error('Error fetching events:', error));

  // Event listener for form submission
  const eventForm = document.getElementById('eventForm');
  eventForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const eventForm = document.getElementById('eventForm');
      const formData = new FormData(eventForm);
      const event = {};

      console.log(formData, formData.keys(), formData.entries())
      formData.forEach((value, key) => {
          event[key] = value;
      });
      console.log(event);
      createEvent(event);
  });

  // Function to create a new event
  function createEvent(event) {
      fetch('/api/event', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(event)
      })
          .then(response => response.json())
          .then(newEvent => {
              if (!newEvent) {
                  console.error('Failed to create event.');
                  return;
              }
              const listItem = document.createElement('li');
              listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
              listItem.textContent = newEvent.name;
              const deleteButton = document.createElement('button');
              deleteButton.className = 'btn btn-danger btn-sm';
              deleteButton.textContent = 'Delete';
              deleteButton.onclick = () => deleteEvent(newEvent.event_id, listItem);
              listItem.appendChild(deleteButton);
              eventList.appendChild(listItem);
              eventForm.reset();
          })
          .catch(error => console.error('Error creating event:', error));
  }

  // Function to delete an event
    function deleteEvent(eventId, listItem) {
      fetch(`/api/event/${eventId}`, { method: 'DELETE'
        }).then(response => {
              if (response.ok) {
                  listItem.remove();
              } else {
                  console.error('Error deleting event:', response.statusText);
              }
          })
          .catch(error => console.error('Error deleting event:', error));
    }

  // Initialize Choices for required skills
  const skillsElement = document.getElementById('requiredSkills');
  new Choices(skillsElement, {
      removeItemButton: true,
      searchEnabled: true,
      placeholderValue: "Select skills",
      noChoicesText: "No more options",
      allowHTML: true // Added to handle deprecation warning
  });

  // Initialize Flatpickr for event date
  flatpickr("#date", {
      mode: "single",
      dateFormat: "Y-m-d",
      enableTime: false,
      minDate: "today",
      "locale": {
          "firstDayOfWeek": 1 
      }
  });
});
