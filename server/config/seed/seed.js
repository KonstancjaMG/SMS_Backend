import sequelize from "../database.js";
import '../associations.js';
import seedRoles from "./seed.roles.js";
import seedUsers from "./seed.users.js";

const seed = async () => {
  try {
    await sequelize.sync({ force: false });
    await seedRoles();
    await seedUsers();
    console.log('Database seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
};

seed();
