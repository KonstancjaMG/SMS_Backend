import './config/database.js';
import './config/associations.js';
import './examplevalues/users.js';

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Server is alive and kicking on port ${port}.`)
})