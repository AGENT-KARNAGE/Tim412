const SubscribeModel = require("../models/subscribe");
exports.subscribe = async (req, res) => {
    const { email } = req.body
    try {
        if (!email || typeof email !== 'string' || !email.trim()) {
            console.log("email not avialable")
            return res.status(400).json({ message: "Email is required" })
        }
        const existingSubscription = await SubscribeModel.findOne({ email });
        if (existingSubscription){
            console.log("email already subscribed")
            return res.status(409).json({ message: "You are already subscribed" })
        }
        const newSubscription = await SubscribeModel.create({email});
        console.log("email subscribed successfully")
        return res.status(201).json({ message: "Subscription successful", data: newSubscription, success:true })
    }
    catch (err) {
      console.log("Error in subscribe controller:", err.message);
      return res.status(500).json({ message: "Internal server error" });
    }



}