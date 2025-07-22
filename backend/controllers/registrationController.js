const Registration = require("../models/registration"); 

// 📝 Register a new participant
exports.register = async (req, res) => {
  const { fullName, age, email, phone, address, program } = req.body;

  // Validate the program name
  if (!["Activate 1.0", "Young & Winning"].includes(program)) {
    console.warn("❗ Invalid program name received:", program);
    return res.status(400).json({ error: "Invalid program name" });
  }

  try {
    // Check for existing user
    const existingUser = await Registration.findOne({ fullName, email });

    if (existingUser) {
      console.log("⚠️ Duplicate registration attempt:", fullName, email);
      return res.status(400).json({
        message: "This name and email have already been used. It seems you’ve already registered.",
        success: false,
      });
    }

    // Create new registration
    const registration = new Registration({
      fullName,
      age,
      email,
      phone,
      address,
      program,
    });

    await registration.save();
    console.log(`✅ Successfully registered for ${program}:`, fullName);

    res.status(201).json({
      message: `Registration for ${program} successful!`,
      success: true,
    });
  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
};

// 📝 Get Activate 1.0 registrations
exports.getActivateRegistrations = async (req, res) => {
  try {
    const data = await Registration.find({ program: 'Activate 1.0' }).sort({ createdAt: -1 });
    console.log(`✅ Fetched ${data.length} Activate 1.0 registrations`);
    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Error fetching Activate 1.0 registrations:", error);
    res.status(500).json({ message: 'Error fetching Activate 1.0 registrations', error });
  }
};

// 📝 Get Young & Winning registrations
exports.getYoungWinningRegistrations = async (req, res) => {
  try {
    const data = await Registration.find({ program: 'Young & Winning' }).sort({ createdAt: -1 });
    console.log(`✅ Fetched ${data.length} Young & Winning registrations`);
    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Error fetching Young & Winning registrations:", error);
    res.status(500).json({ message: 'Error fetching Young & Winning registrations', error });
  }
};

// 📝 Get all registrations
exports.getAll = async (req, res) => {
  try {
    const data = await Registration.find().sort({ createdAt: -1 });
    console.log(`✅ Fetched ${data.length} total registrations`);
    res.json(data);
  } catch (error) {
    console.error("❌ Failed to fetch all registrations:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};