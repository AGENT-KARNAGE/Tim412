const Registration = require("../models/registration");

exports.register = async (req, res) => {
  const { fullName, age, email, phone, address, program } = req.body;

  if (!["Activate 1.0", "Young & Winning"].includes(program)) {
    return res.status(400).json({ error: "Invalid program name" });
  }

  try {
    const registration = new Registration({
      fullName,
      age,
      email,
      phone,
      address,
      program
    });

    await registration.save();
    res.status(201).json({ message: `Registration for ${program} successful!` });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Fetch Activate 1.0 only
exports.getActivateRegistrations = async (req, res) => {
  try {
    const data = await Registration.find({ program: 'Activate 1.0' }).sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Activate 1.0 registrations', error });
  }
};

// Fetch Young & Winning only
exports.getYoungWinningRegistrations = async (req, res) => {
  try {
    const data = await Registration.find({ program: 'Young & Winning' }).sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Young & Winning registrations', error });
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await Registration.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};
