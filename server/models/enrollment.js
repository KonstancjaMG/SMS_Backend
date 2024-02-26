import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Enrollment = sequelize.define('Enrollment', {
    id: { type: DataTypes.UUID, primaryKey: true },
    grade: { type: DataTypes.INTEGER }
  });

export default Enrollment
  