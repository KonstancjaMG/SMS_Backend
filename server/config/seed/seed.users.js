// seed.users.js
import bcrypt from 'bcrypt';
import User from '../../models/user.js';
import Role from '../../models/role.js';

async function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

async function seedUsers() {
  try {

    // Find roles
    const adminRole = await Role.findOne({ where: { name: 'administrator' } });
    const teacherRole = await Role.findOne({ where: { name: 'teacher' } });
    const studentRole = await Role.findOne({ where: { name: 'student' } });

    // Create users and link them to the seeded profiles and roles
    const adminUser = await User.create({
      firstName: 'Admin',
      lastName: 'Istrator',
      email: 'admin@example.com',
      passwordHash: await hashPassword('adminPassword'),
    });
    await adminUser.addRole(adminRole);

    const teacherUser = await User.create({
      firstName: 'Teacher',
      lastName: 'Person',
      email: 'teacher@example.com',
      passwordHash: await hashPassword('teacherPassword'),
    });
    await teacherUser.addRole(teacherRole);

    const studentUser = await User.create({
      firstName: 'Student',
      lastName: 'Learner',
      email: 'student@example.com',
      passwordHash: await hashPassword('studentPassword'),
    });
    await studentUser.addRole(studentRole);

    console.log('Users and roles associations have been seeded successfully.');
  } catch (error) {
    console.error('Failed to seed users and roles', error);
  }
}

export default seedUsers;
