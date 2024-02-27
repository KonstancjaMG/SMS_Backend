import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Material = sequelize.define('Material', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
    fileName: { type: DataTypes.STRING },
    fileType: { type: DataTypes.STRING },
    filePath: { type: DataTypes.STRING }
  });

export default Material
  