import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const AdministratorProfile = sequelize.define('AdministratorProfile', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true
  },
  user_id: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { 
      model: 'Users',
      key: 'id' 
    }
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


  export default AdministratorProfile;