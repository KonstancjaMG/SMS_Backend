import express from 'express';
import * as attendanceService from '../services/attendance.js';

const router = express.Router();

router.post('/attendance', async (req, res) => {
    try {
        const { enrollmentId, date } = req.body;
        const attendance = await attendanceService.createAttendance(enrollmentId, date);
        res.status(201).json(attendance);
    } catch (error) {
        res.status(500).json({ message: "Error creating attendance", error: error.message });
    }
});

router.get('/attendance/:id', async (req, res) => {
    try {
        const attendance = await attendanceService.getAttendanceById(req.params.id);
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving attendance", error: error.message });
    }
});

router.put('/attendance/:id', async (req, res) => {
    try {
        const updatedAttendance = await attendanceService.updateAttendance(req.params.id, req.body);
        res.json(updatedAttendance);
    } catch (error) {
        res.status(500).json({ message: "Error updating attendance", error: error.message });
    }
});

router.delete('/attendance/:id', async (req, res) => {
    try {
        const result = await attendanceService.deleteAttendance(req.params.id);
        if (result) {
            res.status(200).send('Attendance deleted successfully');
        } else {
            res.status(404).send('Attendance not found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.get('/attendance/enrollment/:enrollmentId', async (req, res) => {
    try {
        const attendances = await attendanceService.getAttendanceByEnrollment(req.params.enrollmentId);
        res.json(attendances);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving attendance by enrollment", error: error.message });
    }
});

router.get('/attendance/class/:classId', async (req, res) => {
    try {
        const attendances = await attendanceService.getAttendanceForClass(req.params.classId);
        res.json(attendances);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving attendance by class", error: error.message });
    }
});

router.get('/attendance/student/:userId', async (req, res) => {
    try {
        const attendances = await attendanceService.getAttendanceForStudent(req.params.userId);
        res.json(attendances);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving attendance by student", error: error.message });
    }
});

export default router;
