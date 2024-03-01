import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Schedule = sequelize.define('Schedule', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
    Monday: { type: DataTypes.TIME, allowNull: true },
    Tuesday: { type: DataTypes.TIME, allowNull: true },
    Wednesday: { type: DataTypes.TIME, allowNull: true },
    Thursday: { type: DataTypes.TIME, allowNull: true },
    Friday: { type: DataTypes.TIME, allowNull: true }
  });

export default Schedule