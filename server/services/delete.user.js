import User from "../models/user.js";

export async function deleteUser(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) return false;
  
      await user.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  }

export default deleteUser;