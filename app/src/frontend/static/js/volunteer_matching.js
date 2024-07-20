document.addEventListener('DOMContentLoaded', function () {
    const volunteerNameElement = document.getElementById('volunteerName');
    const volunteerNameElementChoices = new Choices(volunteerNameElement, {
        removeItemButton: true,
        searchEnabled: true,
        placeholderValue: "Select volunteers",
        noChoicesText: "No more options",
        allowHTML: true
    });



    const eventSelect = document.getElementById('event');
    window.onEventChange = function(eventElement) {
        const selectedEventId = eventSelect.value;
            
        if (window.events && Array.isArray(window.events)) {
            const matchingEvent = window.events.find(event => event.event_id === selectedEventId);

            console.log(matchingEvent.required_skills.join(', '))
            if (matchingEvent) {
                window.selectedEvent = matchingEvent
                let element = document.getElementById('requiredSkills');
                element.value = matchingEvent.required_skills.join(', ');
                element.outerText = `:${matchingEvent.required_skills.join(', ')}`;
                getEventVolunteers(selectedEventId, matchingEvent.required_skills)
            } else {
                console.log('No matching event found');
            }
        } else {
            console.error('window.events is not defined or not an array');
        }
    }

    const form = document.getElementById('volunteerForm');
    form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
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

        fetch(`/api/event`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                event_id: window.selectedEvent.event_id,
                required_skills: window.selectedEvent.required_skills,
                name: window.selectedEvent.name,
                description: window.selectedEvent.description,
                location: window.selectedEvent.location,
                date: window.selectedEvent.date,
                urgency: window.selectedEvent.urgency,
                matched_volunteers: selectedVolunteers
            })
        })

    }, false);

    // Initialize Choices for volunteers
    
    // // Fetch and display all volunteer matches on page load
    // const volunteerMatchesList = document.getElementById('volunteerMatchesList');
    // function fetchVolunteerMatches() {
    //     fetch('/api/volunteer/matches')
    //         .then(response => response.json())
    //         .then(matches => {
    //             volunteerMatchesList.innerHTML = ''; // Clear existing list
    //             matches.forEach(match => {
    //                 const listItem = document.createElement('li');
    //                 listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
    //                 listItem.textContent = `${match.eventName}: ${match.volunteerNames.join(', ')}`;
    //                 const deleteButton = document.createElement('button');
    //                 deleteButton.className = 'btn btn-danger btn-sm';
    //                 deleteButton.textContent = 'Delete';
    //                 deleteButton.onclick = () => deleteVolunteerMatch(match.matchId, listItem);
    //                 listItem.appendChild(deleteButton);
    //                 volunteerMatchesList.appendChild(listItem);
    //             });
    //         })
    //         .catch(error => console.error('Error fetching volunteer matches:', error));
    // }

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
    const eventsList = document.getElementById('event');
    fetch('/api/event/all')
        .then(response => response.json())
        .then(events => {
            events.forEach(event => {
                console.log(event)
                const option = document.createElement('option');
                option.value = event.event_id;
                option.textContent = event.name;
                eventsList.appendChild(option);
            });
            window.events = events
        })
        .catch(error => console.error('Error fetching events:', error));

    function getEventVolunteers(eventID, requiredSkills) {
        fetch(`/api/volunteer/matchVolunteersToEvent`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({eventID: eventID, requiredSkills: requiredSkills})
        })
            .then(response => response.json())
            .then(data => {
                if(data.status > 299) {
                    alert(data.message)
                    return false;
                }
                
                const volunteers = data.data
                let matched_volunteers = volunteers.matched_volunteers
                let all_volunteers = volunteers.all_volunteers

                let choices = []
                matched_volunteers.forEach(volunteer => {
                    choices.push({ value: volunteer.id, label: volunteer.fullname, selected: true, disabled: true });
                });

                all_volunteers.forEach(volunteer => {
                    choices.push({ value: volunteer.id, label: volunteer.fullname, selected: false, disabled: false });
                });

                volunteerNameElementChoices.setChoices(choices, 'value', 'label', false);
            })
    }

    // // Fetch volunteer profiles and populate volunteer select box
    // fetch('/api/volunteer/profiles')
    //     .then(response => response.json())
    //     .then(data => {
    //         const volunteers = data.data;
    //         volunteers.forEach(volunteer => {
    //             const option = document.createElement('option');
    //             option.value = volunteer.id;
    //             option.textContent = volunteer.fullname;
    //             volunteerNameElement.appendChild(option);
    //         });
    //     })
    //     .catch(error => console.error('Error fetching volunteers:', error));


});
