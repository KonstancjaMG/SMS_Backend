import './config/database.js';
import './config/associations.js';

import userRouter from './controllers/user.js'
import profileRouter from './controllers/profile.js'
import classRouter from './controllers/class.js'
import ClassAssignmentRouter from './controllers/classAssignment.js';
import EnrollmentRouter from './controllers/enrollment.js'

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Enrollment from './models/enrollment.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api', userRouter)
app.use('/api', profileRouter)
app.use('/api', classRouter)
app.use('/api', ClassAssignmentRouter)
app.use('/api', EnrollmentRouter)

app.listen(port, () => {
    console.log(`Server is alive and kicking on port ${port}.`)
})