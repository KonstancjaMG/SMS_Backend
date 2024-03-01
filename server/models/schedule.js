import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Schedule = sequelize.define('Schedule', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
    Monday: { type: DataTypes.DATE },
    Tuesday: { type: DataTypes.DATE },
    Wednesday: { type: DataTypes.DATE },
    Thursday: { type: DataTypes.DATE },
    Friday: { type: DataTypes.DATE }
  });

export default Schedule