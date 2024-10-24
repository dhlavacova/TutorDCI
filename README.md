Project Overview

This repository contains both the frontend and backend of Tutor App, a MERN stack application that allows users to manage tutoring sessions, calendars, and authentication. The app is designed to help tutors and students organize their schedules efficiently.


Frontend

The frontend of this app is developed using React and Vite for fast development and build processes. TailwindCSS is used for styling, while libraries like react-hook-form and react-date-picker handle form and date inputs.

Frontend Dependencies

	•	@nextui-org/react: UI components like buttons, dropdowns, and modals.
	•	react-router-dom: For client-side routing.
	•	axios: For making API requests.
	•	react-calendar, react-date-range, react-datetime-picker: Various date picker components for scheduling tutoring sessions.
	•	react-hook-form: For form handling and validation.

Scripts

	•	dev: Starts the development server.
	•	build: Builds the application for production.
	•	preview: Previews the production build locally.

Backend

The backend is built with Node.js and Express.js. It includes user authentication, file uploading, and scheduling features using tools like Multer, Node-Cron, and JWT for secure token handling.

Backend Dependencies

	•	express: Web framework for building APIs.
	•	mongoose: ODM for MongoDB to manage and query data.
	•	jsonwebtoken: For handling authentication tokens.
	•	bcryptjs: For hashing passwords securely.
	•	node-cron: For scheduling tasks.
	•	nodemailer: For sending emails.
	•	pdf-puppeteer: For generating PDFs (used for session reports, invoices, etc.).

Scripts

	•	start: Runs the backend using nodemon for hot-reloading during development.

Installation and Setup

	1.	Clone the repository
 	2.	Install dependencies:   
    For the frontend:
  - cd client
  - npm install
    For the backend:
  - cd backend
  - npm install
	3.	Setup environment variables:
	•	Create a .env file in the backend directory and configure your MongoDB URI, JWT secret, and email service credentials.
 	4.	Run the project:
	•	For the frontend:
  - npn run dev
  •	For the backend:
  - npm run start
	
	5.	Visit the application: Open http://localhost:3000 to view the app.

Features

	•	User Authentication: Secure user login and registration using JWT.
	•	Scheduling: Tutors and students can schedule sessions using a calendar.
	•	Email Notifications: Tutors and students receive notifications about scheduled sessions.
	•	PDF Generation: Create PDF invoices or session summaries.
	•	CRUD operations: Full Create, Read, Update, Delete functionality for managing tutoring sessions.

Technologies Used

Frontend:

	•	React
	•	Vite
	•	TailwindCSS
	•	Axios
	•	NextUI components

Backend:

	•	Node.js
	•	Express.js
	•	MongoDB + Mongoose
	•	JWT for authentication
	•	Nodemailer for sending emails
	•	Node-cron for scheduled tasks
	•	Multer for file uploading
    
