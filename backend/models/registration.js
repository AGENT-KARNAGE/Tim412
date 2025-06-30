const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  program: {
    type: String,
    enum: ["Activate 1.0", "Young & Winning"],
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Registration", registrationSchema);