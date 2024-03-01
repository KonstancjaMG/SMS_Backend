import Enrollment from '../models/enrollment.js';
import User from '../models/user.js';
import Role from '../models/role.js';
import Class from '../models/class.js';

const createEnrollment = async (enrollmentData) => {
    const { UserId, ClassId } = enrollmentData;
    const user = await User.findByPk(UserId, {
        include: [{
            model: Role,
            attributes: ['name']
        }]
    });
  
    if (!user) {
        throw new Error('User not found');
    }

    if (!user.Role || user.Role.name !== 'student') {
        throw new Error('Only students can be enrolled');
    }

    const classExists = await Class.findByPk(ClassId);
    if (!classExists) {
        throw new Error('Class not found');
    }
  
    return await Enrollment.create(enrollmentData);
};

const getEnrollmentById = async (id) => {
    return await Enrollment.findByPk(id, {
        include: [User, Class]
    });
};

const getAllEnrollments = async () => {
    return await Enrollment.findAll({
        include: [User, Class]
    });
};

const updateEnrollment = async (id, enrollmentData) => {
    const enrollmentToUpdate = await Enrollment.findByPk(id);
    if (!enrollmentToUpdate) {
        throw new Error('Enrollment not found');
    }
  
    return await enrollmentToUpdate.update(enrollmentData);
};

const deleteEnrollment = async (id) => {
    const enrollmentToDelete = await Enrollment.findByPk(id);
    if (!enrollmentToDelete) {
        throw new Error('Enrollment not found');
    }
  
    await enrollmentToDelete.destroy();
    return true;
};

export { createEnrollment, getEnrollmentById, getAllEnrollments, updateEnrollment, deleteEnrollment };
