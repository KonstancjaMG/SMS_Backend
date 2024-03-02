import express from 'express';
import * as materialService from '../services/material.js';
import upload from '../config/upload.js';
import Material from '../models/material.js';

const router = express.Router();

router.post('/:classId/upload', upload.single('materialFile'), async (req, res) => {
    try {
        const { path, mimetype, size, filename } = req.file;
        const { classId } = req.params;
        const materialData = {
            fileName: filename,
            fileType: mimetype,
            filePath: path,
            mimeType: mimetype,
            fileSize: size
        };
        const material = await materialService.addMaterialToClass(materialData, classId);
        res.status(201).json(material);
    } catch (error) {
        res.status(500).json({ message: "Error uploading material", error: error.message });
    }
});

router.get('/:classId/materials', async (req, res) => {
    try {
        const { classId } = req.params;
        const materials = await materialService.getMaterialsByClassId(classId);
        res.json(materials);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving materials for the class", error: error.message });
    }
});

router.get('/:classId/materials/:materialId', async (req, res) => {
    try {
        const { classId, materialId } = req.params;
        const material = await materialService.getMaterialByClassIdAndMaterialId(classId, materialId);
        res.json(material);
    } catch (error) {
        if (error.message === 'Class not found' || error.message === 'Material not found in the specified class') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Error retrieving material", error: error.message });
        }
    }
});

router.get('/download/:fileId', async (req, res) => {
    try {
        const fileId = req.params.fileId;
        const material = await Material.findByPk(fileId);

        if (!material) {
            return res.status(404).send("File not found.");
        }

        const filePath = material.filePath;
        const fileName = material.fileName;

        res.download(filePath, fileName, (err) => {
            if (err) {
                if (!res.headersSent) {
                    res.status(500).send("Error downloading the file.");
                }
            }
        });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

export default router;
