document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('profile-details');
    form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        const fullName = document.getElementById('fullname');
        if (fullName.value === "" || fullName.value.length < 2 || fullName.value.length > 50) {
            alert('Please enter your full name.');
            event.preventDefault();
        }

        const addressOne = document.getElementById('address1');
        if (addressOne.value === "" || addressOne.value.length < 2 || addressOne.value.length > 100) {
            alert('Please enter a valid address between 2 and 100 characters.');
            event.preventDefault();
        }

        const addressTwo = document.getElementById('address2');
        if (addressTwo.value != "" && addressTwo.value.length < 2 || addressTwo.value.length > 100) {
            alert('Please enter a valid address between 2 and 100 characters.');
            event.preventDefault();
        }


        const skillsSelect = document.getElementById('skills');
        if (skillsSelect.selectedOptions.length === 0) {
            alert('Please select at least one skill.');
            event.preventDefault();
        }

        let selectedSkills = [];
        let skillsElements = skillsSelect.parentElement.getElementsByClassName('choices__list choices__list--multiple');
        for (let i = 0; i < skillsElements.length; i++) {
            let element = skillsElements[i];
            const selected = element.getElementsByClassName('choices__item choices__item--selectable');
            for (let j = 0; j < selected.length; j++) {
                let selectedElement = selected[j];
                selectedSkills.push(selectedElement.outerText.replaceAll('Remove item',''));
            }
        }


        const stateSelect = document.getElementById('state');
        if (stateSelect.value === "" || stateSelect.value.length !== 2) {
            alert('Please select a valid state.');
            event.preventDefault();
        }

        const zipcodeInput = document.getElementById('zipcode');
        let isValid = false;
        if (zipcodeInput.value.length === 5 || zipcodeInput.value.length === 9) {
            isValid = true
        }

        if (!isValid) {
            alert('Please enter a valid 5 or 9 digit zip code.');
            event.preventDefault();
        }

        let preferencesInput = document.getElementById('preferences');
        if (preferencesInput.value === "" || preferencesInput.value.length < 2 || preferencesInput.value.length > 100) {
            alert('Please enter a valid preferences between 2 and 100 characters. Enter NA if no preferences.');
            event.preventDefault();
        }
        
        const availabilitySelect = document.getElementById('availability');
        if (availabilitySelect.selectedOptions.length === 0) {
            alert('Please select at least one availability day.');
            event.preventDefault();
        }

        let selectedAvailability = [];
        let availabilityElements = availabilitySelect.parentElement.getElementsByClassName('choices__list choices__list--multiple');
        for (let i = 0; i < availabilityElements.length; i++) {
            let element = availabilityElements[i];
            const selected = element.getElementsByClassName('choices__item choices__item--selectable');
            for (let j = 0; j < selected.length; j++) {
                let selectedElement = selected[j];
                selectedAvailability.push(selectedElement.outerText.replaceAll('Remove item',''));
            }
        }

        form.classList.add('was-validated');

        const data = {
            fullname: fullName.value,
            address_one: addressOne.value,
            address_two: addressTwo.value,
            skills: selectedSkills,
            state: stateSelect.value,
            zip_code: zipcodeInput.value,
            preferences: preferencesInput.value,
            availability: selectedAvailability
        }

        console.log(JSON.stringify(data))

        axios.post('/api/profile/update', data)
            .then(function(response) {
                if(response.status === 200) {
                    alert(`${response.data.message}`)
                } else {
                    throw new Error(JSON.stringify(response))
                }
                // Handle further actions here, like redirecting to another page
            })
            .catch(function(error) {
                let response = JSON.parse(error.message)
                alert(response.data.message);
            });

    }, false);
});

document.addEventListener('DOMContentLoaded', async function () {
    const skillsElement = document.getElementById('skills');
    const skillsChoices = new Choices(skillsElement, {
        removeItemButton: true,
        searchEnabled: true,
        placeholderValue: "Select skills",
        noChoicesText: "No more options",
        itemSelectText: "Click to select"
    });

    const availabilityElement = document.getElementById('availability');
    const availabilityChoices = new Choices(availabilityElement, {
        removeItemButton: true,
        searchEnabled: true,
        placeholderValue: "Select availability",
        noChoicesText: "No more options",
        itemSelectText: "Click to select"
    });


    // send request to get profile from /api/profile/get and populate the form
    // {
        //     "status": 200,
        //     "message": "Profile retrieved successfully",
        //     "data": {
        //         "id": 1,
        //         "created_at": "2024-07-18T01:36:28.25652+00:00",
        //         "user_id": "62629aa1-1c03-4ca3-b668-ded92cd38830",
        //         "fullname": "Kunwar S",
        //         "address_one": "123 Main Street",
        //         "address_two": "Apartment 404",
        //         "city": null,
        //         "state": "CA",
        //         "zip_code": "77777",
        //         "skills": [
        //             "Design",
        //             "Management"
        //         ],
        //         "preferences": "NA",
        //         "availability": [
        //             "Tuesday",
        //             "Thursday",
        //             "Sunday"
        //         ]
        //     }
        // }

    try {   
        axios.get('/api/profile/get').then((response) => {
            const profileResponse = response.data;
            if(profileResponse.status != 200) {
                throw new Error(JSON.stringify(profileResponse))
            }

            const profileData = profileResponse.data;
            // populate the form
            document.getElementById('fullname').value = profileData.fullname;
            document.getElementById('address1').value = profileData.address_one;
            document.getElementById('address2').value = profileData.address_two;
            document.getElementById('zipcode').value = profileData.zip_code;
            document.getElementById('preferences').value = profileData.preferences;
            
            //[
            //     { value: 'One', label: 'Label One', disabled: true },
            //     { value: 'Two', label: 'Label Two', selected: true },
            //     { value: 'Three', label: 'Label Three' },
            // ],
            // 'value',
            // 'label',
            // false,

            const skillsChoicesData = profileData.data.skills.map((skill) => {
                return { value: skill.toLowerCase(), label: skill, selected: true };
            });
        
            skillsChoices.setChoices(skillsChoicesData, 'value', 'label', false);

            const availabilityChoicesData = profileData.data.availability.map((availability) => {
                return { value: availability.toLowerCase(), label: availability, selected: true };
            });
        
            availabilityChoices.setChoices(availabilityChoicesData, 'value', 'label', false);
        })
    } catch (error) {
        console.log(error)
        let response = JSON.parse(error.message)
        alert(response.data.message);
    }
    

});
