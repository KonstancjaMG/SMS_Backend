import express from 'express';
import {
  createClassAssignment,
  getClassAssignmentById,
  getAllClassAssignments,
  updateClassAssignment,
  deleteClassAssignment
} from '../services/classAssignment.js';

const router = express.Router();

router.post('/class-assignments', async (req, res) => {
  try {
    const { userId, classId } = req.body;
    const newAssignment = await createClassAssignment({ UserId: userId, ClassId: classId });
    res.status(201).json(newAssignment);
  } catch (error) {
    res.status(500).json({ message: "Error creating class assignment", error: error.message });
  }
});

router.get('/class-assignments/:id', async (req, res) => {
  try {
    const assignment = await getClassAssignmentById(req.params.id);
    if (assignment) {
      res.status(200).json(assignment);
    } else {
      res.status(404).json({ message: 'Class assignment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving class assignment", error: error.message });
  }
});

router.get('/class-assignments', async (req, res) => {
  try {
    const assignments = await getAllClassAssignments();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving class assignments", error: error.message });
  }
});

router.put('/class-assignments/:id', async (req, res) => {
  try {
    const updatedAssignment = await updateClassAssignment(req.params.id, req.body);
    if (updatedAssignment) {
      res.status(200).json(updatedAssignment);
    } else {
      res.status(404).json({ message: 'Class assignment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating class assignment", error: error.message });
  }
});

router.delete('/class-assignments/:id', async (req, res) => {
  try {
    const deleted = await deleteClassAssignment(req.params.id);
    if (deleted) {
        res.status(200).json({ message: "Class assignment deleted successfully" });
    } else {
        res.status(404).json({ message: 'Class assignment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting class assignment", error: error.message });
  }
});

export default router;
