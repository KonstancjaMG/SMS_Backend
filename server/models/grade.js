import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Grade = sequelize.define('Grade', {
    id: { type: DataTypes.UUID, primaryKey: true }
  });

export default Grade
  