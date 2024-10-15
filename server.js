const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const ENV_VARS = require('./config/envVars');

const app = express();
dotenv.config();

// connect mongoose
connectDB();

// default
app.get('/',(req,res)=>{
    res.send("Fitness App API");
})

// middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/workouts', require('./routes/workouts.js'));
app.use('/api/goals', require('./routes/goals.js'));
app.use('/api/statistics', require('./routes/statistics.js'));
app.use('/api/admin', require('./routes/admin'))
app.use('/api/fitness-programs', require('./routes/fitnessPrograms.js'));




// console.log("MONGODB_URI:",process.env.MONGO_URI);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})