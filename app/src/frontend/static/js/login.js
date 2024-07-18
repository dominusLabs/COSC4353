document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-button');

    loginButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const emailInput = document.getElementById('email');
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
            email: email,
            password: password
        };

        // Use axios to send a POST request
        axios.post('/api/auth/login-account', data)
            .then(function(response) {
                if(response.status === 200) {
                    alert(`${response.data.message}`)
                    document.cookie = `token=${response.data.data.token}`
                    window.location.href = '/profile'
                } else {
                    throw new Error(JSON.stringify(response))
                }
                // Handle further actions here, like redirecting to another page
            })
            .catch(function(error) {
                let response = JSON.parse(error.message)
                alert(response.data.message);
            });
    });
});
