# YoyaChat 

YoyaChat is a full-stack real-time chat application.

**Note:** I (the AI) only developed and fixed the **backend** portion and the integration bugs. The frontend was pre-built.

## Features

*   **Real-time Messaging:** Chat instantly with friends using Socket.IO.
*   **User Authentication:** Secure signup and login using JWT stored in HTTP-only cookies.
*   **Friend Connections (Connect ID):** Add friends securely using a unique 6-digit Connect ID. No searching by email required.
*   **Online Status:** See when your friends are online or offline in real-time.
*   **Typing Indicators:** See when the other person is typing a message.
*   **Unread Badges:** Keep track of unread messages in each conversation.
*   **Persistent Sessions:** Redis is used to track active user sessions and socket connections reliably.

## Tech Stack

*   **Frontend:** React (Vite), TypeScript, Tailwind CSS, Zustand, React Query, Socket.IO Client.
*   **Backend:** Node.js, Express, MongoDB (Mongoose), Redis, Socket.IO, JWT.

## How to Run

### Prerequisites

You need to have Docker and Docker Compose installed on your system to run the required databases. You also need Node.js installed.

### 1. Start Services (MongoDB & Redis)

The backend requires MongoDB and Redis to function. A `docker-compose.yaml` file is provided in the `backend` directory.

```bash
cd backend
docker compose up -d
```
*Note: Make sure port 27017 (Mongo) and 6379 (Redis) are available on your machine.*

### 2. Setup Variables

Make sure the `.env` file in the `backend` directory is setup correctly. Example:

```env
CLIENT_ORIGIN=http://localhost:5173
MONGO_URL=mongodb://127.0.0.1:27017/myChatApp
PORT=4000
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development
REDIS_URI=redis://127.0.0.1:6379
```

### 3. Run the Backend

Open a terminal, navigate to the backend directory, and start the development server:

```bash
cd backend
npm install
npm start
```
The server will run on `http://localhost:4000`.

### 4. Run the Frontend

Open a second terminal, navigate to the frontend directory, and start Vite:

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`. Open this URL in your browser to start chatting!
