# SMS_Backend Overview
Develop and deploy a RESTful API for a School Management System that manages students, teachers, classes, and optionally grades. This project will emphasize the creation of a robust backend using Node.js, Express.js, Sequelize, MySQL, and integration with other technologies for authentication, notifications, and file management. The final system should be deployed to Vercel for live interaction.

## Key Features & Functionalities
* Implement JWT authentication with Passport.js for secure access.
* Define roles for Admin, Teacher, and Student, each with different access levels (optional).
* Add, view, edit, and delete student records.
* Manage teacher profiles and their class assignments.
* Create, update, view, and delete class information, including schedules and enrolled students.
* Enable teachers to manage grades for their students, providing CRUD operations on grades.
* Implement Nodemailer for sending automated email alerts for new assignments, grades, or class schedules.
* Use node-cron for scheduling and sending reminders for upcoming classes or deadlines.
* Generate PDF reports for student grades or attendance.
* Allow for the upload and download of educational content.
* Deploy the backend system to Vercel.

## Detailed Use Cases/User Stories
### As Admin, I want to
* Add, view, edit, and delete teacher and student profiles.
* Create classes and assign teachers to them.
* View reports on class attendance and overall grades.
### As Teacher, I want to
* View my class schedules.
* Access and manage grades for students in my classes.
* Upload educational materials and assignments.
* Receive notifications about upcoming classes or school events.
### As Student, I want to
* View my class schedule and enrolled classes.
* Access grades for my courses.
* Download assignments and educational materials.
* Receive email notifications about new assignments or grades.
## Technical Requirements
* Secure and well-structured endpoints using Express.js.
* Clear separation of concerns (models, routers, services).
* Secure routes with JWT tokens and implement role-based access control (optional).
* Efficient relational database design with Sequelize and MySQL.
* Successfully deploy the API to Vercel with environment variables and database connectivity.
* Use Swagger or similar tools for API documentation (optional).
* README file with detailed setup, deployment instructions, and API usage.
## Deployment Instructions
* Ensure that all environment variables are configured properly on Vercel.
* Follow Vercel's documentation for deploying Node.js applications.
* Test the live API endpoints to confirm that the deployment was successful.
## Submission Guidelines
* The project must be submitted by the specified deadline.
* Code should be pushed to a private GitHub repository. The README must include comprehensive setup and deployment instructions.
* Add courses@hicoders.ch as collaborator.
* Include a .env.example file in the repository for necessary environment variables.
* The final API should be live on Vercel, with the URL provided in the submission.

# Domain Model Design (outdated)
![DMD drawio](https://github.com/KonstancjaMG/SMS_Backend/assets/143395555/2915ab30-a79e-449a-9a10-b961b314e57f)

# EMD (outdated)
![EMD drawio](https://github.com/KonstancjaMG/SMS_Backend/assets/143395555/6dae2273-7be3-4a4f-80ca-3e56b3f33bb0)

# How to run

### 1. Install all dependencies
`npm i bcrypt cors dotenv express jsonwebtoken multer mysql2 node-cron nodemailer passport pdfkit sequelize uuid`
### 2. Setup the container from the root folder
`docker container up`
### 3. Start the server
`npm start`

