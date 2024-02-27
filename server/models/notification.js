// models/notification.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: { type: DataTypes.STRING },
  body: { type: DataTypes.STRING }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});



export default Notification;
