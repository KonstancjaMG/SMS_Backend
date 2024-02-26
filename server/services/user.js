import User from '../models/user.js';
import Role from '../models/role.js';

const getUsers = async () => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Role,
          as: 'Roles',
          through: { attributes: [] }, // Excludes join table attributes
        },
        // {
        //   model: Profile,
        //   as: 'profile' // Adjust based on how you've set up your association
        // }
      ],
    });
    return users;
  } catch (error) {
    console.error('Error fetching users with roles and profiles:', error);
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findOne({
      where: { id: id },
      include: [
        {
          model: Role,
          as: 'Roles',
          through: { attributes: [] },
        },
        // {
        //   model: Profile,
        //   as: 'profile' // Make sure this matches your association alias
        // }
      ],
    });
    return user;
  } catch (error) {
    console.error(`Error fetching user with id ${id} and their details:`, error);
    throw error;
  }
};

const getUsersByRoleName = async (roleName) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Role,
          as: 'Roles',
          where: { name: roleName },
          through: { attributes: [] },
        },
        // {
        //   model: Profile,
        //   as: 'profile' // Consistent with your association's naming
        // }
      ],
    });
    return users;
  } catch (error) {
    console.error(`Error fetching users with role ${roleName} and profiles:`, error);
    throw error;
  }
};

export default { getUsers, getUserById, getUsersByRoleName };