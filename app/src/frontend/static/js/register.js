document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-button');

    registerForm.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const emailInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const roleSelect = document.getElementById('role');
        const email = emailInput.value;
        const password = passwordInput.value;
        const role = roleSelect.value;

        // Validate the email address using a simple regex
        if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            alert('Please enter a valid email address.', 3000);
            return;
        }

        // Check if the password is not empty
        if (password === '') {
            alert('Please enter your password.', 3000);
            return;
        }

        // Ensure that a role is selected
        if (role === 'volunteer' || role === 'administrator') {
            // Prepare the request body
            const data = {
                email: email,
                password: password,
                accountType: role
            };

            // Use axios to send a POST request
            axios.post('/api/auth/register-account', data)
                .then(function(response) {
                    if(response.status === 201) {
                        alert('Registration successful: ' + response.data.message, 5000);
                    } else {
                        throw new Error(JSON.stringify(response));
                    }
                })
                .catch(function(error) {
                    let response = JSON.parse(error.message)
                    alert('Registration failed: ' + response.data.message, 5000);
                });
        } else {
            alert('Please select a valid role.', 3000);
        }
    });
});
