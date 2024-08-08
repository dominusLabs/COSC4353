document.addEventListener('DOMContentLoaded', function() {
  // Login button
  document.getElementById('loginButton')?.addEventListener('click', function() {
    window.location.href = '/login'; // Redirect to login page
  });

  // Signup button
  document.getElementById('signupButton')?.addEventListener('click', function() {
    window.location.href = '/register'; // Redirect to register page
  });

  // Logout button
  document.getElementById('logoutButton')?.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default button action

    axios.get('/logout')
      .then(function(response) {
        if (response.status === 200) {
          window.location.href = '/login'; // Redirect to login page after successful logout
        } else {
          console.error('Logout failed with status:', response.status);
          alert('Logout failed. Please try again.');
        }
      })
      .catch(function(error) {
        console.error('Error during logout:', error);
        alert('An error occurred while logging out.');
      });
  });
});


// window.renderRequestResponse = function(message, duration = 3000) {
//   const container = document.getElementById('notification-container');

//   // Create the notification element
//   const notification = document.createElement('div');
//   notification.className = 'notification';
//   notification.innerText = message;

//   // Append to the container
//   container.appendChild(notification);

//   // Make it visible and animate into view
//   setTimeout(() => {
//       notification.style.opacity = 1;
//       notification.style.transform = 'translateX(0)';
//   }, 100);

//   // Automatically remove the notification after 'duration' milliseconds
//   setTimeout(() => {
//       notification.style.opacity = 0;
//       notification.style.transform = 'translateX(100px)';

//       // Remove from DOM after animation
//       setTimeout(() => {
//           container.removeChild(notification);
//       }, 300); // matches the transition duration

//   }, duration);
// };
