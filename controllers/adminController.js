
const User = require('../models/user');
const FitnessProgram = require('../models/FitnessProgram.js');

const adminController = {};

// Get all users
adminController.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a user
adminController.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Prevent Admin from deleting themselves
    if (req.user._id.toString() === id) {
      return res.status(400).json({ message: 'Admin cannot delete themselves.' });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    await user.remove();
    res.json({ message: 'User removed.' });
  } catch(err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ message: 'User not found.' });
    res.status(500).send('Server Error');
  }
};

// Update user role
adminController.updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!['Admin', 'User'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role specified.' });
  }

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    user.role = role;
    await user.save();
    res.json({ message: 'User role updated.', user });
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new fitness program
adminController.createFitnessProgram = async (req, res) => {
  const { name, description, workouts } = req.body;

  try {
    let program = await FitnessProgram.findOne({ name });
    if (program) return res.status(400).json({ message: 'Fitness program already exists.' });

    program = new FitnessProgram({
      name,
      description,
      workouts
    });

    await program.save();
    res.status(201).json(program);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all fitness programs
adminController.getFitnessPrograms = async (req, res) => {
  try {
    const programs = await FitnessProgram.find().sort({ createdAt: -1 });
    res.json(programs);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update a fitness program
adminController.updateFitnessProgram = async (req, res) => {
  const { id } = req.params;
  const { name, description, workouts } = req.body;

  try {
    let program = await FitnessProgram.findById(id);
    if (!program) return res.status(404).json({ message: 'Fitness program not found.' });

    // Update fields
    program.name = name || program.name;
    program.description = description || program.description;
    program.workouts = workouts || program.workouts;

    await program.save();
    res.json(program);
  } catch(err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ message: 'Fitness program not found.' });
    res.status(500).send('Server Error');
  }
};

// Delete a fitness program
adminController.deleteFitnessProgram = async (req, res) => {
  const { id } = req.params;

  try {
    let program = await FitnessProgram.findById(id);
    if (!program) return res.status(404).json({ message: 'Fitness program not found.' });

    await program.remove();
    res.json({ message: 'Fitness program removed.' });
  } catch(err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ message: 'Fitness program not found.' });
    res.status(500).send('Server Error');
  }
};

module.exports = adminController;
