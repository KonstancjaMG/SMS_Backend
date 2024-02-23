import './config/database.js';
import sequelize from './config/database.js';
import applyAssociations from './config/associations.js';

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

applyAssociations(sequelize);
console.log(`Associations applied successfully.`);

app.listen(port, () => {
    console.log(`Server is alive and kicking on port ${port}.`)
})