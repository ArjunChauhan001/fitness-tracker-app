
const Goal = require('../models/Goal.js');

const goalController = {};

// Create a new goal
goalController.createGoal = async (req, res) => {
  const { type, target, startDate, endDate } = req.body;
  
  try {
    const goal = new Goal({
      user: req.user._id,
      type,
      target,
      startDate,
      endDate
    });
    await goal.save();
    res.status(201).json(goal);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all goals for the authenticated user
goalController.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user._id }).sort({ startDate: -1 });
    res.json(goals);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update a goal
goalController.updateGoal = async (req, res) => {
  const { id } = req.params;
  const { type, target, achieved, startDate, endDate } = req.body;

  try {
    let goal = await Goal.findById(id);
    if (!goal) return res.status(404).json({ message: 'Goal not found.' });

    // Ensure the goal belongs to the user or user is Admin
    if (goal.user.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Access denied.' });
    }

    // Update fields
    goal.type = type || goal.type;
    goal.target = target || goal.target;
    if (achieved !== undefined) goal.achieved = achieved;
    goal.startDate = startDate || goal.startDate;
    goal.endDate = endDate || goal.endDate;

    await goal.save();
    res.json(goal);
  } catch(err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ message: 'Goal not found.' });
    res.status(500).send('Server Error');
  }
};

// Delete a goal
goalController.deleteGoal = async (req, res) => {
  const { id } = req.params;

  try {
    let goal = await Goal.findById(id);
    if (!goal) return res.status(404).json({ message: 'Goal not found.' });

    // Ensure the goal belongs to the user or user is Admin
    if (goal.user.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Access denied.' });
    }

    await goal.remove();
    res.json({ message: 'Goal removed.' });
  } catch(err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ message: 'Goal not found.' });
    res.status(500).send('Server Error');
  }
};

module.exports = goalController;
