# Non-Profit Volunteer Management Web Application

This project is a web application designed to help a non-profit organization manage and optimize their volunteer activities. The application allows the organization to efficiently allocate volunteers to different events and tasks based on their preferences, skills, and availability.

## Features

The software includes the following components:

1. **Login**
   - Allows volunteers and administrators to register if not already registered.
2. **User Registration**
   - Initially only requires username (email) and password.
3. **User Profile Management**
   - Users log in to complete their profile, including location, skills, preferences, and availability.
4. **Event Management**
   - Administrators can create and manage events, specifying required skills, location, and urgency.
5. **Volunteer Matching**
   - Matches volunteers to events/tasks based on their profiles and the event requirements.
6. **Notification System**
   - Sends notifications to volunteers for event assignments, updates, and reminders.
7. **Volunteer History**
   - Tracks volunteer participation history and performance.

## Front-End Development Components

The front end includes the following components:

- **Login Page**
  - Allows volunteers and administrators to register if not registered yet.
- **User Registration Page**
  - Initially only requires username (use email) and password.
- **User Profile Page/Form**
  - Includes fields for Full Name, Address, City, State, Zip code, Skills, Preferences, and Availability.
- **Event Management Form**
  - Administrators can create and manage events.
- **Volunteer Matching Form**
  - Administrators can view and match volunteers to events based on their profiles and event requirements.
- **Notification System**
  - Displays notifications for new event assignments, updates, and reminders.
- **Volunteer History**
  - Displays all volunteer participation history in a tabular format.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/dominusLabs/COSC4353
```

2. Change directory:
```bash
cd app
npm install
npm run start:dev
```

3. Install dependencies:
```bash
npm install
```

4. Run App:
```bash
npm run start:dev
```

5. Open Link:
[http://localhost:3000/](http://localhost:3000/)