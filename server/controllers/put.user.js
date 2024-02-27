import express from 'express';
import * as UserService from '../services/put.user.js';

const router = express.Router();

router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password, roleName } = req.body;

  try {
    const updatedUser = await UserService.updateUser(id, firstName, lastName, email, password, roleName);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
});

export default router;