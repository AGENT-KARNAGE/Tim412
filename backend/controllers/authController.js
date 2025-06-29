const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const {firstname, lastname, age, department, education, email, password} = req.body
    try {
        //validating user ...
        //check if any required fields are missing (simple validation)
        const isInvalidString = (value) =>
        typeof value !== "string" || value.trim() === "";

        if (
        isInvalidString(firstname) ||
        isInvalidString(lastname) ||
        isInvalidString(email) ||
        isInvalidString(password)
        ) {
        return res.status(400).json({
            message: "First name, last name, email, and password must be valid non-empty strings.",
        });
        }

        if (age && (isNaN(age) || age < 16 || age > 24)){
          return res.status(400).json({ message: "Invalid age. Must be between 10 and 100." });
        }

        // Email format check
        const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegx.test(email)){
            return res.status(400).json({message: "Invalid email format."})
        }

        // Password Length check
        if(password.Length < 6){
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }
        
         // Checking if user exist already
        const exisiting = await User.findOne({email});
        if (exisiting) res.status(400).json({message:"User already exist use another email"});
        
        const harshedPassword = await bcrypt.hash(password, 10)
        // Creating user
        const newUser = await User.create({firstname, lastname, age, department, education, email, password:harshedPassword})
        res.status(201).json({user:newUser, message:"User created successfully "})

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

// ✅ LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || typeof email !== "string" || email.trim() === "") {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Don't send password in response
    const { password: _, ...userData } = user.toObject();

    res.json({ user: userData, token }); // ✅ matches frontend expectations

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch all User
exports.allUsers = async(req,res)=>{
   try{
    const allUsers = await User.find({})
    return res.json({allUsers})
   }
   catch(err){
    console.error("error while sending loading all users:", err)
     res.status(500).json({ error: "Failed to fetch users" });
  }
}

// Delete all User
exports.delAllUsers = async (req, res) => {
  try {
    const result = await User.deleteMany({}); // ✅ use deleteMany
    res.json({ message: "All users deleted", result });
  } catch (err) {
    console.error("Error while deleting all users:", err);
    res.status(500).json({ error: "Failed to delete all users" });
  }
};