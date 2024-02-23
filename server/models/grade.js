import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Grade = sequelize.define('Grade', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    student_id: { type: DataTypes.INTEGER, references: { model: 'StudentProfiles', key: 'user_id' } },
    class_id: { type: DataTypes.INTEGER, references: { model: 'Classes', key: 'id' } },
    grade: DataTypes.STRING
  });

  export default Grade;