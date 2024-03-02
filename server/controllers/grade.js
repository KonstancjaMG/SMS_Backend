import express from 'express';
import * as gradeService from '../services/grade.js';

const router = express.Router();

router.post('/enrollments/:enrollmentId/grades', async (req, res) => {
    try {
        const grade = await gradeService.createGrade(req.params.enrollmentId, req.body);
        res.status(201).json(grade);
    } catch (error) {
        res.status(500).json({ message: "Error creating grade", error: error.message });
    }
});

router.get('/users/:userId/grades', async (req, res) => {
    try {
        const grades = await gradeService.getGradesByUserId(req.params.userId);
        res.json(grades);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving grades", error: error.message });
    }
});

router.put('/grades/:gradeId', async (req, res) => {
    try {
        const updatedGrade = await gradeService.updateGrade(req.params.gradeId, req.body);
        res.json(updatedGrade);
    } catch (error) {
        res.status(500).json({ message: "Error updating grade", error: error.message });
    }
});

router.delete('/grades/:gradeId', async (req, res) => {
    try {
        const success = await gradeService.deleteGrade(req.params.gradeId);
        if (success) {
            res.status(200).send('Grade deleted successfully');
        } else {
            res.status(404).send('Grade not found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

export default router;
