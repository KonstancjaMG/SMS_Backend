import User from '../models/user.js';
import Role from '../models/role.js';

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

export default createUser;
