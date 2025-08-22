# IVTech Assignment

## Overview

A full-stack web application for user authentication, question creation, and answering questions. Backend uses Express.js and MongoDB, frontend uses React and Redux.

## Features

- User authentication (JWT, SHA-512 password hashing)
- Protected routes (frontend and backend)
- Create and view questions
- Add and view answers
- Simple navigation bar and logout

## Technologies

- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT
- Frontend: React, Redux, Axios, Vite

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB (local or Atlas)

### Backend Setup

1. Install dependencies:
   ```sh
   cd server
   npm install
   ```
2. Configure environment variables in `.env`:
   ```env
   MONGO_URI=your_mongo_url
   JWT_SECRET=your_jwt_secret
   ```
3. Start MongoDB locally or use Atlas.
4. Run backend:
   ```sh
   npm start
   ```

### Frontend Setup

1. Install dependencies:
   ```sh
   cd client
   npm install
   ```
2. Run frontend:
   ```sh
   npm run dev
   ```

## Project Structure

```
server/
  models/        # Mongoose models (User, Question, Answer)
  routes/        # Express routes (auth, qa)
  controllers/   # Route controllers
  middleware/    # Middleware (auth)
  seeds/         # Seed scripts
  index.js       # Entry point
client/
  src/
    components/  # React components
    pages/       # React pages
    store/       # Redux store
  main.jsx       # Entry point
```

## Usage

- Register users via seed script or directly in MongoDB.
- Login to get JWT token.
- Create/view questions and answers.

## Development

- Backend auto-restarts with `nodemon`.
- Environment variables managed via `.env`.

## License

MIT
