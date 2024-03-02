import Class from '../models/class.js';

const createClass = async (classData) => {
  return await Class.create(classData);
};

const getClassById = async (id) => {
  return await Class.findByPk(id);
};

const getAllClasses = async () => {
  return await Class.findAll();
};

const updateClass = async (id, classData) => {
  const classToUpdate = await Class.findByPk(id);
  if (!classToUpdate) throw new Error('Class not found');

  return await classToUpdate.update(classData);
};

const deleteClass = async (id) => {
  const classToDelete = await Class.findByPk(id);
  if (!classToDelete) throw new Error('Class not found');

  await classToDelete.destroy();
};

export { createClass, getClassById, getAllClasses, updateClass, deleteClass };
