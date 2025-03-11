# YouTube Clone (MERN Stack)

## GitHub Link: https://github.com/EddieExe/YouTube_Clone_Project

## Overview
This project is a full-stack YouTube Clone built using the **MERN (MongoDB, Express, React, Node.js) stack**. Users can browse, search, and watch videos, create channels, upload content, and interact with comments and likes.

## Features
### Frontend (React)
- **Home Page**: Displays a YouTube-style UI with a **header, sidebar, video grid, and filters**.
- **User Authentication**: Users can **register, log in, and authenticate using JWT**.
- **Search & Filter**: Search for videos by title and filter by category.
- **Video Player Page**: Watch videos with **like/dislike, description, and comments**.
- **Channel Page**: Users can create channels and manage their uploaded videos.
- **Responsive Design**: The app is fully responsive across **mobile, tablet, and desktop**.

### Backend (Node.js & Express)
- **User Authentication**: Secure sign-up and login with **JWT authentication**.
- **Video Management**: APIs to **fetch, upload, edit, and delete videos**.
- **Channel Management**: APIs to **create and manage channels**.
- **Comment System**: Users can **add, edit, and delete comments**.
- **MongoDB Integration**: Stores user details, video metadata, and comments.

## Technologies Used
### Frontend:
- React.js
- React Router
- Axios
- Tailwind CSS (or custom CSS)

### Backend:
- Node.js
- Express.js
- MongoDB (MongoDB Atlas or local instance)
- JWT for authentication

## Installation & Setup
### Prerequisites
- **Node.js & npm** installed
- **MongoDB** (local or cloud via MongoDB Atlas)
- **Git** for version control

### Clone the Repository
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YouTube_Clone_Project.git
cd YouTube_Clone_Project
```

### Backend Setup
```bash
cd backend
npm install
```
- Create a `.env` file and add your MongoDB connection string and JWT secret:
  ```env
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  ```
- Start the backend server:
  ```bash
  npm start
  ```

### Frontend Setup
```bash
cd ../frontend
npm install
npm start
```

## Usage
- Open `http://localhost:3000/` in your browser.
- Sign up or log in to explore features.
- Search, filter, and watch videos.
- Create a channel and upload videos.
- Interact with comments and likes.

## Folder Structure
```
YouTube_Clone_Project/
│── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── .env
│── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   ├── index.js
│── README.md
```

## Future Improvements
- Add **video upload functionality**.
- Implement **real-time chat and live streaming**.
- Improve **nested comments and notifications**.

## Contributors
- **Aditya Shriramjwar**

## License
This project is open-source and free to use under the **MIT License**.
