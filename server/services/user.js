import User from '../models/user.js';
import Role from '../models/role.js';

const getUsersWithRoles = async () => {
  try {
    const users = await User.findAll({
      include: [{
        model: Role,
        as: 'Roles', // This should match the alias you used in your association definitions
        through: { attributes: [] }, // This ensures that join table attributes are not included
      }],
    });
    return users;
  } catch (error) {
    console.error('Error fetching users with roles:', error);
    throw error; // Rethrow the error for the caller to handle
  }
};

export default getUsersWithRoles;
