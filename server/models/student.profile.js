import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const StudentProfile = sequelize.define('StudentProfile', {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'Users', key: 'id' } },
    class_id: { type: DataTypes.INTEGER, references: { model: 'Classes', key: 'id' } }
  });
  
  
  export default StudentProfile;