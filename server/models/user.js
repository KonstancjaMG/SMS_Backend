import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import bcrypt from 'bcrypt';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const hash = bcrypt.hashSync(value, 10);
      this.setDataValue('passwordHash', hash);
    }
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

User.beforeCreate((user) => {
  user.passwordHash = bcrypt.hashSync(user.passwordHash, bcrypt.genSaltSync(10));
});
  
  export default User;