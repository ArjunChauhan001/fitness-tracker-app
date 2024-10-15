// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require("dotenv");
dotenv.config();

const auth = {};

// Verify JWT Token
auth.verifyToken = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token)
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user)
      return res
        .status(401)
        .json({ message: "User not found, authorization denied." });
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid." });
  }
};

// Authorize based on user roles
auth.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return res
        .status(403)
        .json({ message: "Access denied: Insufficient permissions." });
    next();
  };
};

module.exports = auth;
