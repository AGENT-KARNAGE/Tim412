const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express()

// Middle ware
app.use(cors())
app.use(express.json())

// Port
const PORT = process.env.PORT || 5110;

// Routes
app.use("/api/auth", authRoutes);


// DB Connection
async function connectDB() {
  try {
    const connection =await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected successfully to MongoDB");

    // Start the server
    app.listen(PORT, () =>
      console.log(`Server currently running on port ${PORT}`)
    );
  } catch (error) {
    console.error("There was an error while connecting:", error);
  }
}

connectDB(); // ✅ Call the function