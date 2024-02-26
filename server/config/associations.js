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

// User associations
User.hasOne(Profile);
User.belongsToMany(Role, { through: 'UserRole' });
User.hasMany(Notification);
User.hasMany(Enrollment);
User.hasMany(ClassAssignment);

// Profile associations
Profile.belongsTo(User);

// Role associations
Role.belongsToMany(User, { through: 'UserRole' });

// Notification associations
Notification.belongsTo(User);

// Class associations
Class.hasMany(Material);
Class.hasMany(Enrollment);
Class.hasMany(ClassAssignment);

// Material associations
Material.belongsTo(Class);

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

// Grade associations
Grade.belongsTo(Enrollment);


