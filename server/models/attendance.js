import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Attendance = sequelize.define('Attendance', {
    id: { type: DataTypes.UUID, primaryKey: true },
    date: { type: DataTypes.DATE }
  });

export default Attendance