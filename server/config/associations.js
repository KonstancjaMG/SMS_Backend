import User from '../models/user.js';
import Role from '../models/role.js';
import Profile from '../models/profile.js'
import Notification from '../models/notification.js'
import ClassAssignment from '../models/classAssignment.js';
import Class from '../models/class.js';
import Enrollment from '../models/enrollment.js';
import Material from '../models/material.js';
import Attendance from '../models/attendance.js';
import Grade from '../models/grade.js';
import Schedule from '../models/schedule.js';

// User associations
User.hasOne(Profile);
User.belongsTo(Role);
User.hasMany(Notification);
User.hasMany(Enrollment);
User.hasMany(ClassAssignment);

// Profile associations
Profile.belongsTo(User);

// Role associations
Role.hasMany(User);

// Notification associations
Notification.belongsTo(User);

// Class associations
Class.belongsToMany(Material, { through: 'ClassMaterials' });
Class.hasMany(Enrollment);
Class.hasMany(ClassAssignment);
Class.hasOne(Schedule);

// Material associations
Material.belongsToMany(Class, { through: 'ClassMaterials' });

// Enrollment associations
Enrollment.belongsTo(User);
Enrollment.belongsTo(Class);
Enrollment.hasMany(Attendance);
Enrollment.hasMany(Grade);

// ClassAssignment associations
ClassAssignment.belongsTo(User);
ClassAssignment.belongsTo(Class);

// Attendance associations
Attendance.belongsTo(Enrollment);

// Schedule associations
Schedule.belongsTo(Class);

// Grade associations
Grade.belongsTo(Enrollment);


