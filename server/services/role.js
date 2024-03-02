import Role from '../models/role.js';

const createRole = async (roleDetails) => {
    try {
        const role = await Role.create(roleDetails);
        return role;
    } catch (error) {
        throw error;
    }
};

const getAllRoles = async () => {
    try {
        const roles = await Role.findAll();
        return roles;
    } catch (error) {
        throw error;
    }
};

export default { createRole, getAllRoles };
