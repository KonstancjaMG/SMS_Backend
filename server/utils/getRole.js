import Role from "../models/role.js";

async function getRoleId(roleName) {
    const role = await Role.findOne({ where: { name: roleName } });
    return role ? role.id : null;
  }

export default getRoleId;