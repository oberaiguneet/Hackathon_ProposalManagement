const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  employeeNumber: { type: String, required: true, unique: true },
  designation: { type: String, required: true },
  sectors: [{ type: String }],
  skills: [{ type: String }],
});

module.exports = mongoose.model("userDetails", userSchema);
