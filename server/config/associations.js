import User from '../models/user.js';
import Role from '../models/role.js';
import Profile from '../models/profile.js'
import Notification from '../models/notification.js'

User.belongsToMany(Role, { through: 'UserRole' });
Role.belongsToMany(User, { through: 'UserRole' });

User.hasOne(Profile);
Profile.belongsTo(User);

User.hasMany(Notification);
Notification.belongsTo(User);

