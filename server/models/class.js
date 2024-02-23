import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Class = sequelize.define('Class', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    teacher_id: { type: DataTypes.INTEGER, references: { model: 'TeacherProfiles', key: 'user_id' } },
    title: DataTypes.STRING,
    schedule: DataTypes.STRING
  });
  
export default Class;