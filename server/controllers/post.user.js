import express from 'express';
import createUser from '../services/post.user.js';

const router = express.Router();

router.post('/users', async (req, res) => {
  const { firstName, lastName, email, password, roleName } = req.body;

  const { user, error } = await createUser({ firstName, lastName, email, password, roleName });

  if (error) {
    return res.status(500).json({ message: "Error creating user", error: error.message });
  }

  res.status(201).json({ user });
});

export default router;
