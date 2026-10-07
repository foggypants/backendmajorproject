# Course Feedback System

A full-stack project where students submit one feedback and rating per completed course, and admins can view the average rating of every course.

Built for **Backend Development Case Study 140** (Node.js, Express.js and MongoDB).

## Live Links

| Part | Link |
|------|------|
| Backend (Render) | https://backendmajorproject.onrender.com |
| Frontend (Vercel) | https://course-feedback-frontend-xqfx.vercel.app/login |

> The backend runs on Render's free tier, so it sleeps when idle. The first request can take up to a minute. Open the backend link first to wake it up.

## Features

- Register and login with JWT authentication
- Two roles: **student** and **admin**
- Admin can add courses
- Student can mark a course as completed and submit one feedback (rating 1-5 and a comment)
- Duplicate feedback for the same student and course is rejected
- Admin can view the average rating of one course or of every course (MongoDB aggregation)
- Validation of rating range and comment text before saving

## Tech Stack

| Part | Technologies |
|------|--------------|
| Backend | Node.js, Express.js, Mongoose, JWT, bcryptjs, dotenv, cors |
| Database | MongoDB Atlas |
| Frontend | React (Vite), React Router, Axios |
| Deployment | Render (backend), Vercel (frontend) |

## Project Structure

```
backend/
├── config/db.js                  MongoDB connection
├── controllers/
│   ├── authController.js         register, login
│   ├── courseController.js       add course, list, get one, mark completed
│   └── feedbackController.js     submit feedback, average ratings
├── middleware/authMiddleware.js  verifyToken, isAdmin, isStudent
├── models/                       User, Course, Feedback
├── routes/                       authRoutes, courseRoutes
├── .env.example
├── package.json
└── server.js

frontend/
├── src/
│   ├── pages/                    Login, Courses, CourseDetails, Admin
│   ├── api.js                    Axios setup (adds the token)
│   ├── App.jsx                   navbar and routes
│   ├── main.jsx
│   └── style.css
├── index.html
├── vercel.json
└── package.json
```

## API Endpoints

| Method | Route | Access | Purpose |
|--------|-------|--------|---------|
| POST | /auth/register | public | Create an account |
| POST | /auth/login | public | Login and get a token |
| POST | /courses | admin | Add a course |
| GET | /courses | logged in | List all courses |
| GET | /courses/:id | logged in | Get one course |
| POST | /courses/:id/complete | student | Mark a course as completed |
| POST | /courses/:id/feedback | student | Submit feedback |
| GET | /courses/:id/average-rating | admin | Average rating of one course |
| GET | /courses/average-ratings | admin | Average rating of every course |

Protected routes need the header `Authorization: Bearer <token>`.

## Database Collections

- **users**: name, email (unique), hashed password, role, completedCourses
- **courses**: title, code (unique), description
- **feedbacks**: course (reference), student (reference), rating (1-5), comment (5-500 characters). A unique index on `course + student` blocks duplicates.

## Run Locally

### Backend

```bash
cd backend
npm install
```

Create a `.env` file (copy `.env.example`):

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_long_random_secret
```

```bash
npm start
```

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file (copy `.env.example`):

```
VITE_API_URL=http://localhost:5000
```

```bash
npm run dev
```

## Deployment Notes

**MongoDB Atlas**
- Create a database user
- In Network Access, allow Render to connect (for example `0.0.0.0/0`)
- Use the connection string with your database name

**Backend on Render**
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Environment variables: `MONGO_URI`, `JWT_SECRET` (Render provides `PORT`)

**Frontend on Vercel**
- Root Directory: `frontend`
- Framework: Vite
- Environment variable: `VITE_API_URL` set to the Render backend URL (no trailing slash)
- Redeploy after changing the variable, because Vite reads it at build time
- `vercel.json` makes page refreshes work with React Router

## How to Test

1. Register an **admin** account and log in. Add two or three courses.
2. Log out, register a **student** account and log in.
3. Open a course, click **Mark as Completed**, then submit a rating and comment.
4. Submit again for the same course. It should be rejected.
5. Log in as admin and open **Ratings Dashboard** to see the averages.

## Security Notes

- Passwords are hashed with bcrypt and never stored as plain text
- Secrets are kept in environment variables, and `.env` is in `.gitignore`
- Role checks happen in the backend, so changing values in the browser does not give admin access

## Known Limitations

- The role can be chosen at registration (done so an admin can be created for testing)
- Feedback cannot be edited or deleted
- Free-tier hosting is slow on the first request after idle time
