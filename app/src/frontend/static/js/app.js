document.getElementById('loginButton').addEventListener('click', function() {
  window.location.href = '/api/auth/login'; // Redirect to login page
});
  
document.getElementById('signupButton').addEventListener('click', function() {
  window.location.href = '/api/auth/register'; // Redirect to register page
});

window.renderRequestResponse = function(message, duration = 3000) {
  const container = document.getElementById('notification-container');

  // Create the notification element
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerText = message;

  // Append to the container
  container.appendChild(notification);

  // Make it visible and animate into view
  setTimeout(() => {
      notification.style.opacity = 1;
      notification.style.transform = 'translateX(0)';
  }, 100);

  // Automatically remove the notification after 'duration' milliseconds
  setTimeout(() => {
      notification.style.opacity = 0;
      notification.style.transform = 'translateX(100px)';

      // Remove from DOM after animation
      setTimeout(() => {
          container.removeChild(notification);
      }, 300); // matches the transition duration

  }, duration);
};
