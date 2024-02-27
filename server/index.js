import './config/database.js';
import './config/associations.js';

import getUsersRouter from './controllers/get.user.js'
import postUserRouter from './controllers/post.user.js'
import putUserRouter from './controllers/put.user.js'
import deleteUserRouter from './controllers/delete.user.js'

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api', getUsersRouter)
app.use('/api', postUserRouter)
app.use('/api', putUserRouter)
app.use('/api', deleteUserRouter)

app.listen(port, () => {
    console.log(`Server is alive and kicking on port ${port}.`)
})