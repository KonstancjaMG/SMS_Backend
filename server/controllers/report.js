import express from 'express';
import {generateAttendanceReport, generateGradeReport} from '../services/report.js';

const router = express.Router();

import { fileURLToPath } from 'url';
import path from 'path';

router.get('/students/:studentId/grades/report', async (req, res) => {
    const { studentId } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, '..', '..', 'reports', `grade-report-${studentId}.pdf`);


    try {
        await generateGradeReport(studentId, filePath);
        res.download(filePath);
    } catch (error) {
        console.error('Error generating grade report:', error);
        res.status(500).send('Error generating grade report');
    }
});

router.get('/students/:studentId/attendance/report', async (req, res) => {
    const { studentId } = req.params;
    const filePath = `./reports/attendance-report-${studentId}.pdf`;

    try {
        await generateAttendanceReport(studentId, filePath);
        res.download(filePath);
    } catch (error) {
        console.error('Error generating attendance report:', error);
        res.status(500).send('Error generating attendance report');
    }
});


export default router;
