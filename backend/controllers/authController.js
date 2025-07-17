const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ REGISTER
exports.register = async (req, res) => {
  const { firstname, lastname, age, department, education, email, password } = req.body;

  console.log("📝 Incoming registration data:", req.body);

  try {
    const isInvalidString = (value) => typeof value !== "string" || value.trim() === "";

    if (
      isInvalidString(firstname) ||
      isInvalidString(lastname) ||
      isInvalidString(email) ||
      isInvalidString(password)
    ) {
      console.log("❌ Validation failed: empty or invalid strings");
      return res.status(400).json({
        message: "First name, last name, email, and password must be valid non-empty strings.",
      });
    }

    if (age && (isNaN(age) || age < 16 || age > 24)) {
      console.log("❌ Invalid age provided:", age);
      return res.status(400).json({ message: "Invalid age. Must be between 16 and 24." });
    }

    const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegx.test(email)) {
      console.log("❌ Invalid email format:", email);
      return res.status(400).json({ message: "Invalid email format." });
    }

    if (password.length < 6) {
      console.log("❌ Password too short:", password.length);
      return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      console.log("⚠️ User already exists with email:", email);
      return res.status(400).json({ message: "User already exists. Use another email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstname,
      lastname,
      age,
      department,
      education,
      email,
      password: hashedPassword,
    });

    console.log("✅ New user created:", newUser);
    res.status(201).json({ user: newUser, message: "User created successfully" });

  } catch (error) {
    console.error("🔥 Error in register:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// ✅ LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  console.log("🔐 Login attempt:", email);

  try {
    if (!email || typeof email !== "string" || email.trim() === "") {
      console.log("❌ Email is missing or invalid");
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found for email:", email);
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Password mismatch for user:", email);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const { password: _, ...userData } = user.toObject();

    console.log("✅ Login successful:", userData);
    res.json({ user: userData, token });

  } catch (err) {
    console.error("🔥 Error in login:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ FETCH ALL USERS
exports.allUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    console.log("📥 All users fetched. Total:", allUsers.length);
    res.json({ allUsers });
  } catch (err) {
    console.error("🔥 Error while loading all users:", err.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// ✅ DELETE ALL USERS
exports.delAllUsers = async (req, res) => {
  try {
    const result = await User.deleteMany({});
    console.log("🗑️ All users deleted:", result);
    res.json({ message: "All users deleted", result });
  } catch (err) {
    console.error("🔥 Error while deleting all users:", err.message);
    res.status(500).json({ error: "Failed to delete all users" });
  }
};