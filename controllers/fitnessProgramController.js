
const FitnessProgram = require('../models/FitnessProgram');

const fitnessProgramController = {};

// Get all fitness programs for users
fitnessProgramController.getAllPrograms = async (req, res) => {
  try {
    const programs = await FitnessProgram.find().sort({ createdAt: -1 });
    res.json(programs);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = fitnessProgramController;
