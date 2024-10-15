// controllers/statisticsController.js
const WorkoutLog = require('../models/WorkoutLog');
const Goal = require('../models/Goal');

const statisticsController = {};

// Get workout statistics
statisticsController.getWorkoutStats = async (req, res) => {
  const { startDate, endDate, activityType } = req.query;
  
  const match = { user: req.user._id };
  
  if (startDate || endDate) {
    match.date = {};
    if (startDate) match.date.$gte = new Date(startDate);
    if (endDate) match.date.$lte = new Date(endDate);
  }
  
  if (activityType) {
    match.activityType = activityType;
  }
  
  try {
    const stats = await WorkoutLog.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$activityType',
          totalDuration: { $sum: '$duration' },
          totalCalories: { $sum: '$caloriesBurned' },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          activityType: '$_id',
          totalDuration: 1,
          totalCalories: 1,
          count: 1
        }
      }
    ]);
    
    res.json(stats);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get goals statistics
statisticsController.getGoalStats = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user._id });
    res.json(goals);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = statisticsController;
