# Online Test Maker MVP

This is a Minimum Viable Product (MVP) for an online test creation and participation platform built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- User authentication (Register & Login)
- JWT-based protected routes
- Admin role for managing users and quizzes
- Quiz creation with multiple questions
- Taking quizzes and seeing results
- Image uploads for questions via Cloudinary
- PDF export for quiz results

## Setup

1.  **Backend:**
    - Navigate to the `/server` directory.
    - Run `npm install`.
    - Create a `.env` file in the root directory and fill in your credentials (DB, JWT, Cloudinary).
    - Run `npm run server` to start the backend server.

2.  **Frontend:**
    - Navigate to the `/client` directory.
    - Run `npm install`.
    - Ensure the proxy in `package.json` is set to `"http://127.0.0.1:5000"`.
    - Run `npm start` to start the React development server.