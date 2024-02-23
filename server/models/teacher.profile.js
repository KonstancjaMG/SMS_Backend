import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const TeacherProfile = sequelize.define('TeacherProfile', {
  user_id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    references: { 
      model: 'Users',
      key: 'id' 
    }
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

  export default TeacherProfile;
  