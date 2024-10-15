
const mongoose = require('mongoose');

const FitnessProgramSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  workouts: [
    {
      day: {
        type: Number, 
        required: true
      },
      activities: [
        {
          activityType: {
            type: String,
            required: true
          },
          duration: {
            type: Number,
            required: true
          },
          caloriesBurned: {
            type: Number,
            required: true
          },
          notes: {
            type: String
          }
        }
      ]
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('FitnessProgram', FitnessProgramSchema);
