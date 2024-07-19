document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('eventForm');
  form.addEventListener('submit', function (event) {
    try{
      if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
      }

      const eventName = document.getElementById('name');
      if (eventName.value === "" || eventName.value.length < 2 || eventName.value.length > 100) {
          alert('Please enter an event name between 2 and 100 characters.');
          event.preventDefault();
      }

      const eventDescription = document.getElementById('description');
      if (eventDescription.value === "" || eventDescription.value.length < 2) {
          alert('Please enter an event description.');
          event.preventDefault();
      }

      const location = document.getElementById('location');
      if (location.value === "" || location.value.length < 2 || location.value.length > 100) {
          alert('Please enter a valid location between 2 and 100 characters.');
          event.preventDefault();
      }

      const skillsSelect = document.getElementById('requiredSkills');
      let selectedSkills = [];
      let skillsElements = skillsSelect.parentElement.getElementsByClassName('choices__list choices__list--multiple');
      for (let i = 0; i < skillsElements.length; i++) {
          let element = skillsElements[i];
          const selected = element.getElementsByClassName('choices__item choices__item--selectable');
          for (let j = 0; j < selected.length; j++) {
              let selectedElement = selected[j];
              selectedSkills.push(selectedElement.outerText.replaceAll('Remove item', ''));
          }
      }

      console.log(selectedSkills);
      if (selectedSkills.length === 0) {
          alert('Please select at least one skill.');
          event.preventDefault();
      }

      const urgency = document.getElementById('urgency');
      if (urgency.value === "") {
          alert('Please select an urgency level.');
          event.preventDefault();
      }

      const eventDate = document.getElementById('date');
      if (eventDate.value === "") {
          alert('Please select an event date.');
          event.preventDefault();
      }

      const data = {
          event_id: window.crypto.randomUUID(),
          name: eventName.value,
          description: eventDescription.value,
          location: location.value,
          required_skills: selectedSkills,
          urgency: urgency.value,
          date: eventDate.value
      }

      console.log(data)

      axios.post('/api/event', data)
          .then(function(response) {
              if(response.status === 200) {
                  alert(`${response.data.message}`)
                  // Refresh event list
                  fetchEvents();
              } else {
                  throw new Error(JSON.stringify(response))
              }
          })
          .catch(function(error) {
              let response = JSON.parse(error.message)
              alert(response.data.message);
          });
    } catch (error) {
      console.log(error)
    }

  }, false);

  // Initialize Choices for required skills
  const skillsElement = document.getElementById('requiredSkills');
  new Choices(skillsElement, {
      removeItemButton: true,
      searchEnabled: true,
      placeholderValue: "Select skills",
      noChoicesText: "No more options",
      allowHTML: true
  });

  // Initialize Flatpickr for event date
  flatpickr("#eventDate", {
      mode: "single",
      dateFormat: "Y-m-d",
      enableTime: false,
      minDate: "today",
  });

  // Fetch and display all events on page load
  const eventList = document.getElementById('eventList');
  function fetchEvents() {
      fetch('/api/event/all')
          .then(response => response.json())
          .then(events => {
              eventList.innerHTML = ''; // Clear the list before adding new events
              events.forEach(event => {
                  const listItem = document.createElement('li');
                  listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
                  listItem.textContent = event.name; // Ensure this matches the column name
                  const deleteButton = document.createElement('button');
                  deleteButton.className = 'btn btn-danger btn-sm';
                  deleteButton.textContent = 'Delete';
                  deleteButton.onclick = () => deleteEvent(event.event_id, listItem);
                  listItem.appendChild(deleteButton);
                  eventList.appendChild(listItem);
              });
          })
          .catch(error => console.error('Error fetching events:', error));
  }

  function deleteEvent(eventId, listItem) {
      fetch(`/api/event/${eventId}`, {
          method: 'DELETE'
      })
          .then(response => {
              if (response.ok) {
                  listItem.remove();
              } else {
                  console.error('Error deleting event:', response.statusText);
              }
          })
          .catch(error => console.error('Error deleting event:', error));
  }

  // Fetch events initially
  fetchEvents();
});
