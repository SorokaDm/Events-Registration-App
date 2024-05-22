# Events Registration App

## Overview

This is a web-based application for events registration, built with a combination of HTML/CSS/JavaScript for the front-end and Node.js for the back-end. The application allows users to view a list of available events, register for events, and view a list of registered participants.

## Base Level Requirements

### Events Board Page
Implement the events board page where users can observe a paginated list of available events. Events should be pre-populated in the database manually or via a seed script. Each event should include the following details:

Title
Description
Event Date
Organizer
### Event Registration Page
By clicking on “Register”, users should be redirected to the event registration page, which contains a registration form with the following fields:

Full Name
Email
Date of Birth
“Where did you hear about this event?”
Once the form is submitted, the response should be stored in a database.

### Event Participants Page
Implement the event participants page where users can see a list of registered participants. This page should be available by clicking on the “View” button.

## Running the Application

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies for both the front-end and back-end:
   ```
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Define environment variables as needed. For example:
     ```
     PORT=5000
     MONGODB_URI=<your MongoDB URI>
     ```
5. Navigate to the project directory and run:
   ```
   npm run dev
   ```
7. Access the application in your browser at `http://localhost:5173`.

## Other functionality

- Sorting events on the events board page by title, event date, and organizer.
- Form validation on the event registration page.
- Displaying a line/bar chart showing the amount of registrations per day for each event on the event participants page.

## Technologies Used

- Front-end: HTML/CSS/JavaScript, React.js, Material-UI, Recharts
- Back-end: Node.js, Express.js, MongoDB

## Folder Structure

- `events-registration-app`: Front-end code.
- `server`: Back-end code.
