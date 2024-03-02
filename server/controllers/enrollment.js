import express from 'express';
import {createEnrollment, getEnrollmentById, getAllEnrollments, updateEnrollment, deleteEnrollment} from '../services/enrollment.js'

const router = express.Router();

router.post('/enrollments', async (req, res) => {
    const { UserId, ClassId } = req.body;
    try {
        const enrollment = await createEnrollment({ UserId, ClassId });
        res.status(201).json(enrollment);
    } catch (error) {
        res.status(500).json({ message: "Error creating enrollment", error: error.message });
    }
});

router.get('/enrollments/:id', async (req, res) => {
    try {
        const enrollment = await getEnrollmentById(req.params.id);
        if (enrollment) {
            res.json(enrollment);
        } else {
            res.status(404).send('Enrollment not found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.get('/enrollments', async (req, res) => {
    try {
        const enrollments = await getAllEnrollments();
        res.json(enrollments);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.put('/enrollments/:id', async (req, res) => {
    try {
        const updatedEnrollment = await updateEnrollment(req.params.id, req.body);
        if (updatedEnrollment) {
            res.json(updatedEnrollment);
        } else {
            res.status(404).json({ message: "Enrollment not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating enrollment", error: error.message });
    }
});

router.delete('/enrollments/:id', async (req, res) => {
    try {
        const deleted = await deleteEnrollment(req.params.id);
        if (deleted) {
            res.status(200).json({ message: "Enrollment deleted successfully" });
        } else {
            res.status(404).json({ message: "Enrollment not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting enrollment", error: error.message });
    }
});

export default router;