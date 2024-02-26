import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Class = sequelize.define('Class', {
    id: { type: DataTypes.UUID, primaryKey: true },
    title: { type: DataTypes.STRING }
  });
  
export default Class;