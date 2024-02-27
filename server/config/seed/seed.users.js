import User from '../../models/user.js';
import Role from '../../models/role.js';
import hashPassword from '../../utils/hashPassword.js';

async function seedUsers() {
  try {
    const adminRole = await Role.findOne({ where: { name: 'administrator' } });
    const teacherRole = await Role.findOne({ where: { name: 'teacher' } });
    const studentRole = await Role.findOne({ where: { name: 'student' } });

    console.log(adminRole.id)
    console.log(studentRole.id)
    console.log(teacherRole.id)

    const adminUser = await User.create({
      firstName: 'Admin',
      lastName: 'Istrator',
      email: 'admin@example.com',
      passwordHash: await hashPassword('adminPassword'),
      RoleId: adminRole.id
    });

    console.log(adminUser);

    const teacherUser = await User.create({
      firstName: 'Teacher',
      lastName: 'Person',
      email: 'teacher@example.com',
      passwordHash: await hashPassword('teacherPassword'),
      RoleId: teacherRole.id
    });

    console.log(teacherUser);

    const studentUser = await User.create({
      firstName: 'Student',
      lastName: 'Learner',
      email: 'student@example.com',
      passwordHash: await hashPassword('studentPassword'),
      RoleId: studentRole.id
    });

    console.log(studentUser);

    console.log('Users and roles associations have been seeded successfully.');
  } catch (error) {
    console.error('Failed to seed users and roles:', error);
  }
}


export default seedUsers;
