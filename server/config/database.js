import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
import applyAssociations from '../config/associations.js';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: console.log
    }
)

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log(`Connection with the database has been established successfully.`);

        applyAssociations(sequelize);
        console.log(`Associations applied successfully.`);

        await sequelize.sync({ force: true }); // WARNING: `force: true` will DROP existing tables and recreate them. Use with caution.
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error(`Unable to connect to the database :(`);
        console.error(error);
    }
}

connectToDatabase();

export default sequelize;