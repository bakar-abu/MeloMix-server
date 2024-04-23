const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensures uniqueness of email addresses
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Example: Minimum password length of 6 characters
  },
  createdAt: {
    type: Date,
    default: Date.now // Sets the default value to the current date and time
  }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };
