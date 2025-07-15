// server.js

// Import the Express framework for building the web server
const express = require('express');

// Import Mongoose for interacting with MongoDB
const mongoose = require('mongoose');

// Import CORS middleware to enable Cross-Origin Resource Sharing
const cors = require('cors');

// Import Body-Parser to parse incoming request bodies in JSON format
const bodyParser = require('body-parser');

// Import routers for each resource
const patientsRouter = require('./routes/patients');
const doctorsRouter = require('./routes/doctors');
const appointmentsRouter = require('./routes/appointments');
const authRouter = require('./Routes/auth'); // ✅ Auth routes for register/login

// Import your custom JWT auth middleware
const auth = require('./middleware/authMiddleware'); // ✅ JWT verify middleware

// Create an instance of an Express app
const app = express();

// Define the port the server will listen on (use environment variable if available, otherwise default to 5000)
const PORT = process.env.PORT || 5000;

// Load environment variables from a .env file into process.env
require('dotenv').config();

// Use the CORS middleware so your API can be accessed from other origins (like your frontend)
app.use(cors());

// Use the Body-Parser middleware to parse incoming JSON requests into JS objects
app.use(bodyParser.json());

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,    // Use the new MongoDB URL parser
  useUnifiedTopology: true, // Use the new server discovery & monitoring engine
});

// Get the default connection object from Mongoose
const connection = mongoose.connection;

// Once the connection is open, log a success message
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Public routes — anyone can access these:
app.use('/auth', authRouter); // Register/Login

// Protected routes — only accessible with valid JWT:
app.use('/patients', auth, patientsRouter);
app.use('/doctors', auth, doctorsRouter);
app.use('/appointments', auth, appointmentsRouter);

// Start the server and listen on the specified port, then log a message when it’s running
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

