import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const EducationalMaterial = sequelize.define('EducationalMaterial', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    class_id: { type: DataTypes.INTEGER, references: { model: 'Classes', key: 'id' } },
    file: DataTypes.BLOB,
    file_name: DataTypes.STRING,
    file_type: DataTypes.STRING,
    teacher_id: { type: DataTypes.INTEGER, references: { model: 'TeacherProfiles', key: 'user_id' } },
    created_at: DataTypes.DATE
  }, {
    timestamps: true,
    createdAt: 'created_at'
  });

  export default EducationalMaterial;