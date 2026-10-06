# Course Feedback System

Node.js + Express + MongoDB (Mongoose) backend.

## Folder Structure
- config/ - database connection
- controllers/ - logic for each route
- middleware/ - token and role checks
- models/ - Mongoose schemas
- routes/ - API URLs
- server.js - starts the app

## Setup
1. `npm install`
2. Copy `.env.example` to `.env` and put your MongoDB Atlas URI and JWT secret
3. `npm start`

## Routes
| Method | Route | Access |
|--------|-------|--------|
| POST | /auth/register | public |
| POST | /auth/login | public |
| POST | /courses | admin |
| GET | /courses | logged in |
| GET | /courses/:id | logged in |
| POST | /courses/:id/complete | student |
| POST | /courses/:id/feedback | student |
| GET | /courses/:id/average-rating | admin |
| GET | /courses/average-ratings | admin |

## Deployment
Deploy on Render/Railway and set `MONGO_URI`, `JWT_SECRET` and `PORT` in the environment variables.
