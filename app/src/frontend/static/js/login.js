document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-button');

    loginButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const emailInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const email = emailInput.value;
        const password = passwordInput.value;

        // Validate the email address using a simple regex
        if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Check if the password is not empty
        if (password === '') {
            alert('Please enter your password.');
            return;
        }

        // Prepare the request body
        const data = {
            username: email,
            password: password
        };

        // Use axios to send a POST request
        axios.post('/api/auth/login', data)
            .then(function(response) {
                alert('Login successful: ' + response.data.message);
                // Handle further actions here, like redirecting to another page
            })
            .catch(function(error) {
                alert('Login failed: ' + (error.response ? error.response.data.message : error.message));
            });
    });
});
