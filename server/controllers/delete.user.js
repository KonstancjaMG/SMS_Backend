import express from 'express';
import * as UserService from '../services/delete.user.js';

const router = express.Router();

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deleted = await UserService.deleteUser(id);
      if (!deleted) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error: error.message });
    }
  });
  
  export default router;