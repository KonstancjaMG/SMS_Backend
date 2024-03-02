import PDFDocument from 'pdfkit';
import fs from 'fs';
import Enrollment from '../models/enrollment.js';
import Grade from '../models/grade.js';
import User from '../models/user.js';
import Class from '../models/class.js';
import Attendance from '../models/attendance.js';

async function generateGradeReport(studentId, filePath) {
    const student = await User.findByPk(studentId);
    const enrollments = await Enrollment.findAll({
        where: { UserId: studentId },
        include: [Class, Grade]
    });

    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(26).text('Grade Report', { align: 'center' }).moveDown(2);
    doc.fontSize(18).text(`Student: ${student.firstName} ${student.lastName}`, { align: 'left' }).moveDown(2);

    for (const enrollment of enrollments) {
        doc.fontSize(16).text(`Class: ${enrollment.Class.title}`, { align: 'left' }).moveDown(1);
        for (const grade of enrollment.Grades) {
            doc.fontSize(14).text(`Grade: ${grade.grade}`, { align: 'left' }).moveDown(0.5);
        }
        doc.moveDown(2);
    }

    doc.end();
}

async function generateAttendanceReport(studentId, filePath) {
    const student = await User.findByPk(studentId);
    const enrollments = await Enrollment.findAll({
        where: { UserId: studentId },
        include: [{ model: Class }, { model: Attendance }]
    });

    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(26).text('Attendance Report', { align: 'center' }).moveDown(2);
    doc.fontSize(18).text(`Student: ${student.firstName} ${student.lastName}`, { align: 'left' }).moveDown(2);

    enrollments.forEach(enrollment => {
        doc.fontSize(16).text(`Class: ${enrollment.Class.title}`, { align: 'left' }).moveDown(1);
        enrollment.Attendances.forEach(attendance => {
            doc.fontSize(14).text(`Date: ${attendance.date.toISOString().split('T')[0]}, Status: ${attendance.status}`, { align: 'left' }).moveDown(0.5);
        });
        doc.moveDown(2);
    });

    doc.end();
}

export {generateAttendanceReport, generateGradeReport}