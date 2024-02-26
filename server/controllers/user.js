import express from 'express';
import getUsersWithRoles from '../services/user.js'; // Adjust the import path

const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const users = await userService.getUsersWithRoles();
    res.json(users);
  } catch (error) {
    console.error('Error in GET /users:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
