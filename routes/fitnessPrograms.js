
const express = require('express');
const router = express.Router();
const fitnessProgramController = require('../controllers/fitnessProgramController.js');
const auth = require('../middleware/auth');


router.get('/', auth.verifyToken, auth.authorizeRoles('User', 'Admin'), fitnessProgramController.getAllPrograms);

module.exports = router;
