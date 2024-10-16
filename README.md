# Fitness Tracker Backend

## Description

The Fitness Tracker Backend is a secure and efficient Node.js application designed to manage user data, workout logs, and goal tracking. It features user authentication with JWT, role-based access control, workout management capabilities, and statistical data generation.

## Features

- **User Authentication**: 
  - JWT-based authentication with two roles: Admin and User.
  
- **Workout Management**: 
  - CRUD API endpoints for managing workout logs and user goals.

- **Statistics Generation**: 
  - Generate workout statistics by date range, activity type, and goal achievement status.

- **Admin Functions**: 
  - Admins can manage users and view aggregate statistics.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcryptjs
- dotenv

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ArjunChauhan001/fitness-tracker-backend.git


## .env
PORT=5000
MONGO_URI=mongodb+srv://arjunchauhan2755:8bD1z7F8wBPhrkRs@cluster0.paxcm.mongodb.net/
JWT_SECRET=my_really_hard_to_decode


## run the server
  -nodemon server.js

  -npm run dev



   
