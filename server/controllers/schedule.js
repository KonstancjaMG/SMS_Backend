import express from 'express';
import * as scheduleService from '../services/schedule.js';

const router = express.Router();

router.post('/schedules/:classId', async (req, res) => {
    try {
        const schedule = await scheduleService.createSchedule(req.params.classId, req.body);
        res.status(201).json(schedule);
    } catch (error) {
        res.status(500).json({ message: "Error creating schedule", error: error.message });
    }
});

router.get('/schedules/:classId', async (req, res) => {
    try {
        const schedule = await scheduleService.getScheduleByClassId(req.params.classId);
        res.json(schedule);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving schedule", error: error.message });
    }
});

router.put('/schedules/:classId', async (req, res) => {
    try {
        const updatedSchedule = await scheduleService.updateSchedule(req.params.classId, req.body);
        res.json(updatedSchedule);
    } catch (error) {
        res.status(500).json({ message: "Error updating schedule", error: error.message });
    }
});

router.delete('/schedules/:classId', async (req, res) => {
    try {
        const success = await scheduleService.deleteSchedule(req.params.classId);
        if (success) {
            res.status(200).send('Schedule deleted successfully');
        } else {
            res.status(404).send('Schedule not found');
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting schedule", error: error.message });
    }
});

router.get('/schedules/teacher/:teacherId', async (req, res) => {
    try {
        const schedules = await scheduleService.getSchedulesByTeacherId(req.params.teacherId);
        res.json(schedules);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving schedules", error: error.message });
    }
});

router.get('/schedules/student/:studentId', async (req, res) => {
    try {
        const schedules = await scheduleService.getSchedulesByStudentId(req.params.studentId);
        res.json(schedules);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving schedules", error: error.message });
    }
});

export default router;
