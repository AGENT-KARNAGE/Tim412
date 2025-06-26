const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
    },
    age: {
      type: Number,
    },
    school: {
      type: String,
    },
    occupation: {
      type: String,
    },
    hobbies: {
      type: String,
    },
    heardAboutUs: {
      type: String,
    },
    interest: {
      type: String,
    },
    image: {
      type: String, // For profile or any uploaded image
    },
    department: {
      type: String, // Example: "ushering", "media", "music", or "none"
    },
    education: {
      type: String, // Education level input
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;