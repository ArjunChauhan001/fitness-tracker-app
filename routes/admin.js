
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');
const auth = require('../middleware/auth');

// User Management

router.get('/users', auth.verifyToken, auth.authorizeRoles('Admin'), adminController.getAllUsers);


router.delete('/users/:id', auth.verifyToken, auth.authorizeRoles('Admin'), adminController.deleteUser);


router.put('/users/:id/role', auth.verifyToken, auth.authorizeRoles('Admin'), adminController.updateUserRole);


router.post('/fitness-programs', auth.verifyToken, auth.authorizeRoles('Admin'), adminController.createFitnessProgram);


router.get('/fitness-programs', auth.verifyToken, auth.authorizeRoles('Admin'), adminController.getFitnessPrograms);


router.put('/fitness-programs/:id', auth.verifyToken, auth.authorizeRoles('Admin'), adminController.updateFitnessProgram);


router.delete('/fitness-programs/:id', auth.verifyToken, auth.authorizeRoles('Admin'), adminController.deleteFitnessProgram);

module.exports = router;
