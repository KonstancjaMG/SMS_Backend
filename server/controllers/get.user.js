import express from 'express';
import userService from '../services/get.user.js';

const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    console.error('Error in GET /users:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(`Error in GET /users/${req.params.id}:`, error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/role/:roleName', async (req, res) => {
  try {
    const users = await userService.getUsersByRoleName(req.params.roleName);
    res.json(users);
  } catch (error) {
    console.error(`Error in GET /users/role/${req.params.roleName}:`, error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
