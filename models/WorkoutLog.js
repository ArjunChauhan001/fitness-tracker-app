
const mongoose = require('mongoose');

const WorkoutLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  activityType: {
    type: String,
    required: true,
    enum: ['Cardio', 'Strength', 'Flexibility', 'Balance', 'Other']
  },
  duration: { 
    type: Number,
    required: true
  },
  caloriesBurned: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('WorkoutLog', WorkoutLogSchema);
