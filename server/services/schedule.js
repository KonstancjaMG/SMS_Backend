import Schedule from '../models/schedule.js';
import Class from '../models/class.js';
import ClassAssignment from '../models/classAssignment.js';
import Enrollment from '../models/enrollment.js';

const createSchedule = async (classId, scheduleData) => {
    const associatedClass = await Class.findByPk(classId);
    if (!associatedClass) {
        throw new Error('Class not found');
    }

    const schedule = await Schedule.create({ ...scheduleData, ClassId: classId });
    return schedule;
};

const getScheduleByClassId = async (classId) => {
    const schedule = await Schedule.findOne({ where: { ClassId: classId } });
    if (!schedule) {
        throw new Error('Schedule not found');
    }
    return schedule;
};

const updateSchedule = async (classId, scheduleData) => {
    const schedule = await Schedule.findOne({ where: { ClassId: classId } });
    if (!schedule) {
        throw new Error('Schedule not found');
    }
    return await schedule.update(scheduleData);
};

const deleteSchedule = async (classId) => {
    const schedule = await Schedule.findOne({ where: { ClassId: classId } });
    if (!schedule) {
        throw new Error('Schedule not found');
    }
    await schedule.destroy();
    return true;
};

const getSchedulesByTeacherId = async (teacherId) => {
    const classAssignments = await ClassAssignment.findAll({
        where: { UserId: teacherId },
        include: [{
            model: Class,
            include: [Schedule]
        }]
    });

    const schedules = classAssignments.map(assignment => {
        if (assignment.Class && assignment.Class.Schedule) {
            return {
                assignmentId: assignment.id,
                classId: assignment.Class.id,
                classTitle: assignment.Class.title,
                schedule: assignment.Class.schedules
            };
        }
        return null;
    }).filter(schedule => schedule !== null);

    return schedules;
};

const getSchedulesByStudentId = async (studentId) => {
    const classEnrollment = await Enrollment.findAll({
        where: { UserId: studentId },
        include: [{
            model: Class,
            include: [Schedule]
        }]
    });

    const schedules = classEnrollment.map(enrollment => {
        if (enrollment.Class && enrollment.Class.Schedule) {
            return {
                enrollmentId: enrollment.id,
                classId: enrollment.Class.id,
                classTitle: enrollment.Class.title,
                schedule: enrollment.Class.schedules
            };
        }
        return null;
    }).filter(schedule => schedule !== null);

    return schedules;
};


export { createSchedule, getScheduleByClassId, updateSchedule, deleteSchedule, getSchedulesByTeacherId, getSchedulesByStudentId };
