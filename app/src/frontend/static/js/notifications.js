document.addEventListener('DOMContentLoaded', function () {
    const notificationList = document.getElementById('notificationList');

    function renderNotifications(data) {
        notificationList.innerHTML = '';
        data.forEach(notification => {
            const listItem = document.createElement('tr');
            listItem.innerHTML = `
                <td>${notification.id}</td>
                <td>${new Date(notification.created_at).toLocaleString()}</td>
                <td>${notification.user_id}</td>
                <td>${notification.message}</td>
                <td>${notification.status}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteNotification('${notification.id}', this)">Delete</button>
                </td>
            `;
            notificationList.appendChild(listItem);
        });
    }

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

    async function deleteNotification(notificationId, button) {
        try {
            const response = await fetch(`/api/notifications/${notificationId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Error deleting notification');
            button.closest('tr').remove();
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    }

    // Fetch notifications initially
    getNotifications();
});
