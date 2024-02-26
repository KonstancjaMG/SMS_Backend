import User from '../models/user.js';
import Role from '../models/role.js';

const getUsers = async () => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Role,
        }
      ],
    });
    return users;
  } catch (error) {
    console.error('Error fetching users with roles:', error);
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
        }
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
          where: { name: roleName },
        },
      ],
    });
    return users;
  } catch (error) {
    console.error(`Error fetching users with role ${roleName}:`, error);
    throw error;
  }
};

export default { getUsers, getUserById, getUsersByRoleName };
