import Attendance from '../models/attendance.js';
import Enrollment from '../models/enrollment.js';

const createAttendance = async (enrollmentId, date) => {
    return await Attendance.create({ EnrollmentId: enrollmentId, date });
};

const getAttendanceById = async (attendanceId) => {
    return await Attendance.findByPk(attendanceId);
};

const updateAttendance = async (attendanceId, updates) => {
    const attendance = await Attendance.findByPk(attendanceId);
    if (!attendance) throw new Error('Attendance not found');
    return await attendance.update(updates);
};

const deleteAttendance = async (attendanceId) => {
    const attendance = await Attendance.findByPk(attendanceId);
    if (!attendance) throw new Error('Attendance not found');
    await attendance.destroy();
    return true;
};

const getAttendanceByEnrollment = async (enrollmentId) => {
    return await Attendance.findAll({ where: { EnrollmentId: enrollmentId } });
};

const getAttendanceForClass = async (classId) => {
    const enrollments = await Enrollment.findAll({ where: { ClassId: classId }, include: [Attendance] });
    return enrollments.map(enrollment => enrollment.Attendances).flat();
};

const getAttendanceForStudent = async (userId) => {
    const enrollments = await Enrollment.findAll({ where: { UserId: userId }, include: [Attendance] });
    return enrollments.map(enrollment => enrollment.Attendances).flat();
};

export { createAttendance, getAttendanceById, updateAttendance, deleteAttendance, getAttendanceByEnrollment, getAttendanceForClass, getAttendanceForStudent };
