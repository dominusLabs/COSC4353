document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('volunteerForm');
    form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }

        const eventName = document.getElementById('eventName');
        if (eventName.value === "" || eventName.value.length < 2 || eventName.value.length > 100) {
            alert('Please enter an event name between 2 and 100 characters.');
            event.preventDefault();
        }

        const requiredSkillsElement = document.getElementById('requiredSkills');
        let selectedSkills = [];
        let skillsElements = requiredSkillsElement.parentElement.getElementsByClassName('choices__list choices__list--multiple');
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

        const volunteerNameElement = document.getElementById('volunteerName');
        if (volunteerNameElement.selectedOptions.length === 0) {
            alert('Please select at least one volunteer.');
            event.preventDefault();
        }

        let selectedVolunteers = [];
        let volunteersElements = volunteerNameElement.parentElement.getElementsByClassName('choices__list choices__list--multiple');
        for (let i = 0; i < volunteersElements.length; i++) {
            let element = volunteersElements[i];
            const selected = element.getElementsByClassName('choices__item choices__item--selectable');
            for (let j = 0; j < selected.length; j++) {
                let selectedElement = selected[j];
                selectedVolunteers.push(selectedElement.outerText.replaceAll('Remove item', ''));
            }
        }

        form.classList.add('was-validated');

        const data = {
            eventName: eventName.value,
            requiredSkills: selectedSkills,
            volunteerNames: selectedVolunteers
        }

        console.log(JSON.stringify(data))

        axios.post('/api/volunteer/match', data)
            .then(function(response) {
                if(response.status === 200) {
                    alert(`${response.data.message}`)
                    // Refresh volunteer matches list
                    fetchVolunteerMatches();
                } else {
                    throw new Error(JSON.stringify(response))
                }
            })
            .catch(function(error) {
                let response = JSON.parse(error.message)
                alert(response.data.message);
            });

    }, false);

    // Initialize Choices for required skills
    const requiredSkillsElement = document.getElementById('requiredSkills');
    new Choices(requiredSkillsElement, {
        removeItemButton: true,
        searchEnabled: true,
        placeholderValue: "Select skills",
        noChoicesText: "No more options",
        allowHTML: true
    });

    // Initialize Choices for volunteers
    const volunteerNameElement = document.getElementById('volunteerName');
    new Choices(volunteerNameElement, {
        removeItemButton: true,
        searchEnabled: true,
        placeholderValue: "Select volunteers",
        noChoicesText: "No more options",
        allowHTML: true
    });

    // Fetch and display all volunteer matches on page load
    const volunteerMatchesList = document.getElementById('volunteerMatchesList');
    function fetchVolunteerMatches() {
        fetch('/api/volunteer/matches')
            .then(response => response.json())
            .then(matches => {
                volunteerMatchesList.innerHTML = ''; // Clear existing list
                matches.forEach(match => {
                    const listItem = document.createElement('li');
                    listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
                    listItem.textContent = `${match.eventName}: ${match.volunteerNames.join(', ')}`;
                    const deleteButton = document.createElement('button');
                    deleteButton.className = 'btn btn-danger btn-sm';
                    deleteButton.textContent = 'Delete';
                    deleteButton.onclick = () => deleteVolunteerMatch(match.matchId, listItem);
                    listItem.appendChild(deleteButton);
                    volunteerMatchesList.appendChild(listItem);
                });
            })
            .catch(error => console.error('Error fetching volunteer matches:', error));
    }

    function deleteVolunteerMatch(matchId, listItem) {
        fetch(`/api/volunteer/match/${matchId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    listItem.remove();
                } else {
                    console.error('Error deleting volunteer match:', response.statusText);
                }
            })
            .catch(error => console.error('Error deleting volunteer match:', error));
    }

    // Fetch events and populate event select box
    fetch('/api/event/all')
        .then(response => response.json())
        .then(events => {
            events.forEach(event => {
                const option = document.createElement('option');
                option.value = event.event_id;
                option.textContent = event.name;
                eventName.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching events:', error));

    // Fetch volunteer profiles and populate volunteer select box
    fetch('/api/volunteer/profiles')
        .then(response => response.json())
        .then(volunteers => {
            volunteers.forEach(volunteer => {
                const option = document.createElement('option');
                option.value = volunteer.id;
                option.textContent = volunteer.fullname;
                volunteerNameElement.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching volunteers:', error));

    // Fetch volunteer matches initially
    fetchVolunteerMatches();
});
