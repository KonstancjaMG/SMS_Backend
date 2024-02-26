import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
    name: DataTypes.STRING
  });

export default Role;