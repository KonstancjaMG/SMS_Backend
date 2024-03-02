import express from 'express';
import {findProfileByUserId, createProfile, updateProfileByUserId, deleteProfileByUserId} from '../services/profile.js'

const router = express.Router();

router.get('/profile/:userId', async (req, res) => {
  try {
    const profile = await findProfileByUserId(req.params.userId);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/profile/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { phoneNumber, address, city, dob } = req.body;

        const profile = await createProfile(userId, { phoneNumber, address, city, dob });

        res.status(201).json(profile);
    } catch (error) {
        res.status(500).json({ message: "Error creating profile", error: error.message });
    }
});


router.put('/profile/:userId', async (req, res) => {
  try {
    const updatedProfile = await updateProfileByUserId(req.params.userId, req.body);
    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/profile/:userId', async (req, res) => {
  try {
    const deletedProfile = await deleteProfileByUserId(req.params.userId);
    if (!deletedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
