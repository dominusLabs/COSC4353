document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('profileForm');
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

        console.log(isValid, zipcodeInput)
        if (!isValid) {
            alert('Please enter a valid 5 or 9 digit zip code.');
            event.preventDefault();
        }

        const availabilityInput = document.getElementById('availability');
        if (availabilityInput.value === "") {
            alert('Please enter your availability date.');
            event.preventDefault();
        }

        form.classList.add('was-validated');
    }, false);
});
