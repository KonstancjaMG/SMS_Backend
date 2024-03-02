import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Grade = sequelize.define('Grade', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },grade: { type: DataTypes.INTEGER }
  });

export default Grade
  