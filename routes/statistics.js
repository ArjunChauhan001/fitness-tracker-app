
const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController.js');
const auth = require('../middleware/auth');


router.get('/workouts', auth.verifyToken, auth.authorizeRoles('User', 'Admin'), statisticsController.getWorkoutStats);

router.get('/goals', auth.verifyToken, auth.authorizeRoles('User', 'Admin'), statisticsController.getGoalStats);

module.exports = router;
