import Grade from '../models/grade.js';
import Enrollment from '../models/enrollment.js';
import { sendEmail } from '../config/mailer.js';
import User from '../models/user.js';

const createGrade = async (enrollmentId, gradeData) => {
    const enrollment = await Enrollment.findByPk(enrollmentId, {
        include: [{ model: User }]
    });
    if (!enrollment) {
        throw new Error('Enrollment not found');
    }
    const newGrade = await Grade.create({ ...gradeData, EnrollmentId: enrollmentId });

    if (enrollment.User && enrollment.User.email) {
        const subject = 'New Grade Posted';
        const htmlContent = `<p>Hello, a new grade has been posted: ${gradeData.grade}</p>`;
        await sendEmail(enrollment.User.email, subject, htmlContent);
    }

    return newGrade;
};


const getGradesByUserId = async (userId) => {
    const enrollments = await Enrollment.findAll({
        where: { UserId: userId },
        include: [Grade]
    });
    const grades = enrollments.flatMap(enrollment => enrollment.Grades);
    return grades;
};

const updateGrade = async (gradeId, gradeData) => {
    const grade = await Grade.findByPk(gradeId, {
        include: [{ 
            model: Enrollment,
            include: [User]
        }]
    });
    if (!grade) {
        throw new Error('Grade not found');
    }
    const updatedGrade = await grade.update(gradeData);

    if (grade.Enrollment && grade.Enrollment.User && grade.Enrollment.User.email) {
        const subject = 'Grade Updated';
        const htmlContent = `<p>Hello, your grade has been updated to: ${gradeData.grade}</p>`;
        await sendEmail(grade.Enrollment.User.email, subject, htmlContent);
    }

    return updatedGrade;
};

const deleteGrade = async (gradeId) => {
    const grade = await Grade.findByPk(gradeId);
    if (!grade) {
        throw new Error('Grade not found');
    }
    await grade.destroy();
    return true;
};

export { createGrade, getGradesByUserId, updateGrade, deleteGrade };
