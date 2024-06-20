document.getElementById('loginButton').addEventListener('click', function() {
    window.location.href = '/api/auth/login'; // Redirect to login page
  });
  
  document.getElementById('signupButton').addEventListener('click', function() {
    window.location.href = '/api/auth/register'; // Redirect to register page
  });