import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ClassAssignment = sequelize.define('ClassAssignment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  });
  

export default ClassAssignment;
