import express from 'express';
import userService from '../services/user.js';

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

router.post('/users', async (req, res) => {
  const { firstName, lastName, email, password, roleName } = req.body;

  const { user, error } = await userService.createUser({ firstName, lastName, email, password, roleName });

  if (error) {
      return res.status(500).json({ message: "Error creating user", error });
  }

  res.status(201).json(user); // Send back the user and the token
});

  router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, password, roleName } = req.body;
  
    try {
      const updatedUser = await userService.updateUser(id, firstName, lastName, email, password, roleName);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error: error.message });
    }
  });

  router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deleted = await userService.deleteUser(id);
      if (!deleted) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error: error.message });
    }
  });

  // Assuming userService is imported at the top
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const { user, token, error } = await userService.loginUser(email, password);

  if (error) {
      return res.status(401).json({ message: "Login failed", error }); // 401 Unauthorized
  }

  res.json({ message: 'Login successful', user, token });
});

export default router;