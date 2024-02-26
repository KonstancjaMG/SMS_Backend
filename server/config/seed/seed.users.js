import bcrypt from 'bcrypt';
import User from '../../models/user.js';
import Role from '../../models/role.js';

async function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

async function seedUsers() {
  try {
    // Optional: Sync database. Remove or set `force: false` in production!
    // await sequelize.sync({ force: true });

    // Find roles
    const adminRole = await Role.findOne({ where: { name: 'Administrator' } });
    const teacherRole = await Role.findOne({ where: { name: 'Teacher' } });
    const studentRole = await Role.findOne({ where: { name: 'Student' } });

    // Create users
    const adminUser = await User.create({
      firstName: 'Admin',
      lastName: 'Istrator',
      email: 'admin@example.com',
      passwordHash: await hashPassword('adminPassword'),
    });

    const teacherUser = await User.create({
      firstName: 'Teacher',
      lastName: 'Person',
      email: 'teacher@example.com',
      passwordHash: await hashPassword('teacherPassword'),
    });

    const studentUser = await User.create({
      firstName: 'Student',
      lastName: 'Learner',
      email: 'student@example.com',
      passwordHash: await hashPassword('studentPassword'),
    });

    // Associate users with roles
    await adminUser.addRole(adminRole);
    await teacherUser.addRole(teacherRole);
    await studentUser.addRole(studentRole);

    console.log('Users and roles associations have been seeded successfully.');
  } catch (error) {
    console.error('Failed to seed users and roles:', error);
  }
}

export default seedUsers;