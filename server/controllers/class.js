import express from 'express';
import { createClass, getClassById, getAllClasses, updateClass, deleteClass } from '../services/class.js';

const router = express.Router();

router.post('/classes', async (req, res) => {
  try {
    const newClass = await createClass(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: "Error creating class", error: error.message });
  }
});

router.get('/classes/:id', async (req, res) => {
  try {
    const classById = await getClassById(req.params.id);
    if (classById) {
      res.status(200).json(classById);
    } else {
      res.status(404).json({ message: 'Class not found' });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving class", error: error.message });
  }
});

router.get('/classes', async (req, res) => {
  try {
    const classes = await getAllClasses();
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving classes", error: error.message });
  }
});

router.put('/classes/:id', async (req, res) => {
  try {
    const updatedClass = await updateClass(req.params.id, req.body);
    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: "Error updating class", error: error.message });
  }
});

router.delete('/classes/:id', async (req, res) => {
  try {
    await deleteClass(req.params.id);
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting class", error: error.message });
  }
});

export default router;
