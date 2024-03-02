import express from 'express';
import roleService from '../services/role.js';

const router = express.Router();

router.post('/roles', async (req, res) => {
    try {
        const role = await roleService.createRole(req.body);
        res.status(201).json(role);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/roles', async (req, res) => {
    try {
        const roles = await roleService.getAllRoles();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
