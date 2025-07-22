const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const testimonyVoluntaryRoutes =  require('./routes/testimonyVoluntaryRoutes');
const prayerRequestRoutes = require('./routes/prayerRequests');
const subscriberRoutes = require('./routes/subscriberRoutes'); 

const app = express()

// Middle ware
app.use(cors())
app.use(express.json())

// Port
const PORT = process.env.PORT || 5110;


app.get("/welcome", (req,res)=>{
  try {
    console.log("welcome to TIM412");
    return res.status(200).json({message:"hello you are welcome to TIM412 server what would you love to eat"})
  } catch (error) {
    console.log("error occured while saying welcome", error)
    return res.status(500).json({message:"error occured while saying welcome"})
  }
})

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/registration", registrationRoutes);
app.use('/api/testimonies-volunteers', testimonyVoluntaryRoutes);
app.use('/api/prayerRequests', prayerRequestRoutes);
app.use('/api/subscribe', subscriberRoutes);


// DB Connection
async function connectDB() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected successfully to MongoDB");


  } catch (error) {
    console.error("There was an error while connecting:", error);
  }
}
    // Start the server
    app.listen(PORT, () =>
       console.log(`🚀 Server running on port ${PORT}`)
    );
connectDB(); // ✅ Call the function