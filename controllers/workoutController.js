
const WorkoutLog = require('../models/WorkoutLog.js');

const workoutController = {};

// Create a new workout log
workoutController.createWorkout = async (req, res) => {
  const { activityType, duration, caloriesBurned, date, notes } = req.body;
  
  try {
    const workout = new WorkoutLog({
      user: req.user._id,
      activityType,
      duration,
      caloriesBurned,
      date,
      notes
    });
    await workout.save();
    res.status(201).json(workout);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all workout logs for the authenticated user
workoutController.getWorkouts = async (req, res) => {
  try {
    const workouts = await WorkoutLog.find({ user: req.user._id }).sort({ date: -1 });
    res.json(workouts);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update a workout log
workoutController.updateWorkout = async (req, res) => {
  const { id } = req.params;
  const { activityType, duration, caloriesBurned, date, notes } = req.body;

  try {
    let workout = await WorkoutLog.findById(id);
    if (!workout) return res.status(404).json({ message: 'Workout not found.' });

    // Ensure the workout belongs to the user or user is Admin
    if (workout.user.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Access denied.' });
    }

    // Update fields
    workout.activityType = activityType || workout.activityType;
    workout.duration = duration || workout.duration;
    workout.caloriesBurned = caloriesBurned || workout.caloriesBurned;
    workout.date = date || workout.date;
    workout.notes = notes || workout.notes;

    await workout.save();
    res.json(workout);
  } catch(err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ message: 'Workout not found.' });
    res.status(500).send('Server Error');
  }
};

// Delete a workout log
workoutController.deleteWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    let workout = await WorkoutLog.findById(id);
    if (!workout) return res.status(404).json({ message: 'Workout not found.' });

    // Ensure the workout belongs to the user or user is Admin
    if (workout.user.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Access denied.' });
    }

    await workout.remove();
    res.json({ message: 'Workout removed.' });
  } catch(err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ message: 'Workout not found.' });
    res.status(500).send('Server Error');
  }
};

module.exports = workoutController;
