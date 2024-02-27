import User from '../models/user.js';
import getRoleId from '../utils/getRole.js';
import hashPassword from '../utils/hashPassword.js';

export async function updateUser(id, firstName, lastName, email, password, roleName) {
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

export default updateUser;