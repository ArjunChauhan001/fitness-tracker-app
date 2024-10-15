
const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController.js');
const auth = require('../middleware/auth');


router.post('/', auth.verifyToken, auth.authorizeRoles('User', 'Admin'), goalController.createGoal);


router.get('/', auth.verifyToken, auth.authorizeRoles('User', 'Admin'), goalController.getGoals);


router.put('/:id', auth.verifyToken, auth.authorizeRoles('User', 'Admin'), goalController.updateGoal);


router.delete('/:id', auth.verifyToken, auth.authorizeRoles('User', 'Admin'), goalController.deleteGoal);

module.exports = router;
