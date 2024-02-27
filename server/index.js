import './config/database.js';
import './config/associations.js';

import userService from './controllers/user.js'
import profileService from './controllers/profile.js'

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api', userService)
app.use('/api', profileService)

app.listen(port, () => {
    console.log(`Server is alive and kicking on port ${port}.`)
})