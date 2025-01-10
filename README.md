# Talk-A-Tive Chat App

A real-time chat application built using the **MERN stack** to create an interactive and user-friendly platform for personal and group chats. This project helps me improve my skills in building scalable web apps with real-time communication.

## Tech Stack

- **Frontend:** React.js, Redux Toolkit, Tailwind CSS, Shadcn/UI
- **Backend:** Express.js, MongoDB, Socket.IO for real-time messaging
- **Tools:** Postman for API testing

## Features

- **User-friendly, responsive UI**
- **Fast real-time messaging**
- **Search and connect** with users for personal or group chats
- **Group chat management:** create, update names, add/remove members (admin only)
- **Personal and group chats** with real-time updates
- **Profile viewing** with user details
- **Instant notifications** for new messages

## Installation

### 1. Clone the repository

git clone https://github.com/karunakarusala/TALK-A-TIVE-CHAT-APP.git
cd TALK-A-TIVE-CHAT-APP
2. Install dependencies for both the frontend and backend
3. Set up the environment variables
Create a .env file in both the Frontend and Backend directories.
Add the following variables to each respective .env file:


REACT_APP_API_URL=http://localhost:5000

Backend .env (in Backend folder):

MONGO_URI=your-mongodb-uri
PORT=5000
SECRET_KEY=your-secret-key
4. Run the application

Run the backend:

cd Backend
npm start

Run the frontend:

cd Frontend
npm start

The application should now be running on http://localhost:3000 for the frontend and http://localhost:5000 for the backend.

Testing the API

You can use Postman to test the API endpoints. Make sure the server is running and use the provided routes for testing purposes.

Additional Notes:

Environment Variables: Make sure to replace your-mongodb-uri and your-secret-key with your actual MongoDB connection URI and secret key.
Running both frontend and backend: You can either run them in separate terminals or use concurrently if you want to run both in a single terminal.
