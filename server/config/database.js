import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
import mysql2 from "mysql2";

dotenv.config();

const options = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
    };
    if (options.dialect === "mysql") {
    options.dialectModule = mysql2;
    }
    const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    options
    );

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log(`Connection with the database has been established successfully.`);
        //await sequelize.sync({ force: false });
        await sequelize.sync({ alter: true });
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error(`Unable to connect to the database :(`);
        console.error(error);
    }
}

connectToDatabase();

export default sequelize;