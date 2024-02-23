import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const AdministratorProfile = sequelize.define('AdministratorProfile', {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'Users', key: 'id' } }
  });

  export default AdministratorProfile;