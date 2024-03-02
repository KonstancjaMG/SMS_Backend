import Material from '../models/material.js';
import Class from '../models/class.js';

const addMaterialToClass = async (materialData, classId) => {
    const newMaterial = await Material.create(materialData);
    const relatedClass = await Class.findByPk(classId);
    if (!relatedClass) {
        throw new Error('Class not found');
    }
    await newMaterial.addClass(relatedClass);
    return newMaterial;
};

const getMaterialsByClassId = async (classId) => {
    const relatedClass = await Class.findByPk(classId, {
        include: Material
    });
    if (!relatedClass) {
        throw new Error('Class not found');
    }
    return relatedClass.Materials;
};

const getMaterialByClassIdAndMaterialId = async (classId, materialId) => {
    const relatedClass = await Class.findByPk(classId, {
        include: [{
            model: Material,
            where: { id: materialId },
            required: false
        }]
    });

    if (!relatedClass) {
        throw new Error('Class not found');
    }

    const material = relatedClass.Materials.find(material => material.id === materialId);
    if (!material) {
        throw new Error('Material not found in the specified class');
    }

    return material;
};

export { addMaterialToClass, getMaterialsByClassId, getMaterialByClassIdAndMaterialId };
