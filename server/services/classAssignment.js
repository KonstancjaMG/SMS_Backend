import ClassAssignment from '../models/classAssignment.js';
import User from '../models/user.js'
import Role from '../models/role.js';

const createClassAssignment = async (assignmentData) => {
    const { UserId } = assignmentData;
    const user = await User.findByPk(UserId, {
        include: [{
            model: Role,
            attributes: ['name']
        }]
    });
  
    if (!user) {
      throw new Error('User not found');
    }

    if (!user.Role || user.Role.name !== 'teacher') {
      throw new Error('Only teachers can be assigned class assignments');
    }
  
    return await ClassAssignment.create(assignmentData);
};

const getClassAssignmentById = async (id) => {
  return await ClassAssignment.findByPk(id);
};

const getAllClassAssignments = async () => {
  return await ClassAssignment.findAll();
};

const updateClassAssignment = async (id, assignmentData,) => {
    const assignmentToUpdate = await ClassAssignment.findByPk(id);
    if (!assignmentToUpdate) {
      throw new Error('ClassAssignment not found');
    }
    console.log('Data uploaded', assignmentData.userId)
    const UserId = assignmentData.userId || assignmentToUpdate.UserId;
    console.log('Data existing', assignmentToUpdate.UserId)
    console.log('UserId', UserId)

    const user = await User.findByPk(UserId, {
      include: [{
        model: Role,
        attributes: ['name']
      }]
    });
    if (!user) {
      throw new Error('User not found');
    }

    console.log(user)
  
    if (!user.Role || user.Role.name !== 'teacher') {
      throw new Error('Only teachers can be assigned to class assignments');
    }
  
    return await assignmentToUpdate.update(assignmentData);
  };
  

  const deleteClassAssignment = async (id) => {
    const assignmentToDelete = await ClassAssignment.findByPk(id);
    if (!assignmentToDelete) throw new Error('ClassAssignment not found');
  
    await assignmentToDelete.destroy();
    return true;
  };

export { createClassAssignment, getClassAssignmentById, getAllClassAssignments, updateClassAssignment, deleteClassAssignment };
