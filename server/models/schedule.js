import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Schedule = sequelize.define('Schedule', {
    day_of_week: DataTypes.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'),
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
  }, {
    timestamps: false
  });
  
  export default Schedule;