import User from '../models/user.js';
import Role from '../models/role.js';
import getRoleId from '../utils/getRole.js';
import hashPassword from '../utils/hashPassword.js';

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

const createUser = async ({ firstName, lastName, email, password, roleName }) => {
    try {
      let RoleId = null;
      if (roleName) {
        const role = await Role.findOne({
          where: { name: roleName }
        });
        console.log('role:', role)
        if (role) {
          RoleId = role.id;
        }
      }
  
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        passwordHash: password,
        RoleId
      });
      
      return { user: newUser, error: null };
    } catch (error) {
      console.error('Error creating user:', error);
      return { user: null, error };
    }
  };

async function updateUser(id, firstName, lastName, email, password, roleName) {
    try {
      const user = await User.findByPk(id);
      if (!user) return null;
  
      const updatedUser = await user.update({
        firstName,
        lastName,
        email,
        passwordHash: password ? await hashPassword(password) : user.passwordHash,
        ...(roleName && { RoleId: await getRoleId(roleName) })
      });
  
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

 async function deleteUser(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) return false;
  
      await user.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  }

export default { getUsers, getUserById, getUsersByRoleName, createUser, updateUser, deleteUser };