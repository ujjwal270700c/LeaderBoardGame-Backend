const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Age: {
    type: Number,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Email_id: {
    type: String,
    required: true,
    unique: true,
  },
  PhoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  Role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
