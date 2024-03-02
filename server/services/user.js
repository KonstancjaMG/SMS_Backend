import User from '../models/user.js';
import Role from '../models/role.js';
import getRoleId from '../utils/getRole.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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
            const role = await Role.findOne({ where: { name: roleName } });
            if (role) {
                RoleId = role.id;
            } else {
                throw new Error('Role does not exist');
            }
        }

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            passwordHash: password,
            RoleId
        });

        const userResponse = { ...newUser.toJSON(), passwordHash: undefined };

        return { user: { ...userResponse }, error: null };
    } catch (error) {
        console.error('Error creating user:', error);
        return { user: null, error: error.message };
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
        passwordHash: password ? await password : user.passwordHash,
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

async function loginUser(email, password) {
  try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
          throw new Error('User not found');
      }

      const isValid = await bcrypt.compare(password, user.passwordHash);
      if (!isValid) {
          throw new Error('Invalid password');
      }

      const token = jwt.sign(
          { userId: user.id, role: user.roleName },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
      );

      return {
          user: {
              id: user.id,
              email: user.email,
              role: user.RoleID
          },
          token,
          error: null
      };
  } catch (error) {
      console.error('Error logging in user:', error);
      return { user: null, token: null, error: error.message };
  }
}


export default { getUsers, getUserById, getUsersByRoleName, createUser, updateUser, deleteUser, loginUser };