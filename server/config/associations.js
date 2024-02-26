import User from '../models/user.js';
import Role from '../models/role.js';

User.belongsToMany(Role, { through: 'UserRole' });
Role.belongsToMany(User, { through: 'UserRole' });