import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Profile = sequelize.define('Profile', {
  id: { type: DataTypes.UUID, primaryKey: true },
  phoneNumber: { type: DataTypes.INTEGER },
  address: { type: DataTypes.STRING },
  city: { type: DataTypes.STRING },
  dob: { type: DataTypes.DATE }
});


export default Profile;