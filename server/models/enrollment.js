import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Enrollment = sequelize.define('Enrollment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  }
  });

export default Enrollment
  