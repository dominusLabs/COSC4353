async function getNotifications() {
    try {
        const response = await fetch('/api/notifications/all');
        if (!response.ok) throw new Error('Error fetching notifications');
        const notifications = await response.json();
        renderNotifications(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
    }
}

function renderNotifications(data) {
    const notificationList = document.getElementById('notificationList');
    notificationList.innerHTML = '';
    data.forEach(notification => {
        const listItem = document.createElement('tr');
        listItem.innerHTML = `
            <td>${new Date(notification.created_at).toLocaleString()}</td>
            <td>${notification.message}</td>
            <td>${notification.is_read ? 'Read' : 'Unread'}</td>
            <td>
                <button class="btn btn-purple btn-sm" onclick="markAsRead('${notification.id}', this)" style="background-color: ${notification.is_read ? 'blue' : 'purple'}; color: white;">
                    ${notification.is_read ? 'Read' : 'Mark as Read'}
                </button>
            </td>
        `;
        notificationList.appendChild(listItem);
    });
}

async function markAsRead(notificationId, button) {
    try {
        const response = await fetch(`/api/notifications/${notificationId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ isRead: true }) // Change to isRead
        });
        if (!response.ok) throw new Error('Error updating notification');
        button.textContent = 'Read';
        button.style.backgroundColor = 'blue';
        button.style.color = 'white';
        button.closest('tr').children[4].textContent = 'Read'; // Update the status text
        button.onclick = null; // Disable further clicks
    } catch (error) {
        console.error('Error updating notification:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Fetch notifications initially
    getNotifications();
});
