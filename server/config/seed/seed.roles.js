import Role from "../../models/role.js";

async function seedRoles() {
  const roles = ['administrator', 'teacher', 'student'];

  const rolePromises = roles.map(async (roleName) => {
    const [role, created] = await Role.findOrCreate({
      where: { name: roleName },
      defaults: { name: roleName }
    });

    if (created) {
      console.log(`Role ${roleName} created!`);
    }
  });

  await Promise.all(rolePromises);
}

export default seedRoles;