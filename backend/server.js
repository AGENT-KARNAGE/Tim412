const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
import testimonyVoluntaryRoutes from './routes/testimonyVoluntaryRoutes.js';

const app = express()

// Middle ware
app.use(cors())
app.use(express.json())

// Port
const PORT = process.env.PORT || 5110;

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/registration", registrationRoutes);
app.use('/api/testimonies-volunteers', testimonyVoluntaryRoutes);


// DB Connection
async function connectDB() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected successfully to MongoDB");

    // Start the server
    app.listen(PORT, () =>
       console.log(`🚀 Server running on port ${PORT}`)
    );
  } catch (error) {
    console.error("There was an error while connecting:", error);
  }
}

connectDB(); // ✅ Call the function