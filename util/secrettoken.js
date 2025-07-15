require("dotenv").config(); // Load environment variables
const jwt = require("jsonwebtoken");

// Generate JWT with user ID, signed using secret key
module.exports = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: "3d" // Token valid for 3 days
  });
};