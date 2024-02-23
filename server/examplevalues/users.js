import User from "../models/user.js";

const usersData = [
    { role: 'Admin', name: 'Alice', surname: 'Smith', email: 'alice.smith@example.com', password_hash: 'hashed_password1', status: 'active' },
    { role: 'Student', name: 'Bob', surname: 'Brown', email: 'bob.brown@example.com', password_hash: 'hashed_password2', status: 'active' },
    { role: 'Teacher', name: 'Carol', surname: 'Johnson', email: 'carol.johnson@example.com', password_hash: 'hashed_password3', status: 'active' },
  ];

  async function createUsersInBulk() {
    try {
      const newUsers = await User.bulkCreate(usersData, {
        validate: true
      });
  
      console.log(`${newUsers.length} users created.`);
    } catch (error) {
      console.error('Error creating users in bulk:', error);
    }
  }
  
  createUsersInBulk();
  