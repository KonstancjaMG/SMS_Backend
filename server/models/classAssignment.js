import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ClassAssignment = sequelize.define('ClassAssignment', {
    id: { type: DataTypes.UUID, primaryKey: true }
  });
  

export default ClassAssignment;
