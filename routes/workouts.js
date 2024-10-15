
const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController.js');
const auth = require('../middleware/auth');


router.post('/', auth.verifyToken, auth.authorizeRoles('User', 'Admin'), workoutController.createWorkout);

router.get('/', auth.verifyToken, auth.authorizeRoles('User', 'Admin'), workoutController.getWorkouts);

router.put('/:id', auth.verifyToken, auth.authorizeRoles('User', 'Admin'), workoutController.updateWorkout);

router.delete('/:id', auth.verifyToken, auth.authorizeRoles('User', 'Admin'), workoutController.deleteWorkout);

module.exports = router;
