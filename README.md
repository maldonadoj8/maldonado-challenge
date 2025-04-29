# Maldonado Challenge

## Overview
This project is a full-stack web application built as a developer exercise for SMART Pump. It allows users to log in, view their account balance, and update their personal details. The stack includes a React frontend (with Vite) and a Node.js backend using lowdb for data persistence.

## Features
- User authentication (login via email and password)
- Protected routes for authenticated users
- View and edit user profile details
- View account balance
- Responsive UI (React + Vite)
- Modular, maintainable codebase

## Project Structure
- `client/` — React frontend
  - `src/` — Main source code
    - `common/components/` — Reusable UI components
    - `features/users/` — User authentication and profile features
    - `layouts/` — App layouts (auth, home)
    - `modules/` — Utility modules (database, user, session, etc.)
    - `routing/` — App routing logic
    - `utils/` — Utility functions
  - `public/` — Static assets
  - `index.html` — Main HTML entry point
- `server/` — Node.js backend
  - `api.js` — API logic (authentication, profile management)
  - `server.js` — Express server setup
  - `data/db.json` — User data (lowdb database)

## How It Works
- The backend (`server/`) exposes API endpoints for login, profile editing, and session management, using lowdb for data storage.
- The frontend (`client/`) is a React app that communicates with the backend via HTTP requests, manages authentication state, and provides a user-friendly interface for all features.
- User sessions are managed in-memory on the server for simplicity.

## How to Run the Project

### 1. Clone the Repository
```
git clone <repo-url>
cd maldonado-challenge
```

### 2. Start the Backend
```
cd server
npm install
npm start
```
The backend will start on the default port (e.g., 3000 or as configured in `server.js`).

### 3. Start the Frontend
Open a new terminal window:
```
cd client
npm install
npm run dev
```
The frontend will start on Vite's default port (usually 5173). Visit [http://localhost:5173](http://localhost:5173) in your browser.

### 4. **Run Both Projects Concurrently**

You can start both the backend and frontend together using the root-level script:

```
npm install # (only needed once, to install root dependencies)
npm run dev
```
This will launch both the server and client at the same time using the `concurrently` package. The backend and frontend will be available on their respective ports.

## How to Navigate the Project
- **Login:** Use one of the emails/passwords from `server/data/db.json` to log in.
- **Profile:** After logging in, you can view and edit your profile details and see your account balance.
- **Codebase:**
  - Frontend logic is in `client/src/` (see `features/users/` for auth/profile, `modules/` for utilities).
  - Backend logic is in `server/api.js` (API) and `server/server.js` (Express setup).

## Notes
- The backend uses lowdb for simplicity; all data is stored in `server/data/db.json`.
- For demo/testing, you can edit `db.json` to add or modify users.
- The project is modular and easy to extend with new features or tests.