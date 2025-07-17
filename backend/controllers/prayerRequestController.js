const PrayerRequest = require('../models/PrayerRequest');

const createPrayerRequest = async (req, res) => {
  try {
    const { message, user } = req.body;
    if (!message || message.trim() === '') {
      console.log("❌ Empty message received");
      return res.status(400).json({ message: 'Prayer message is required' });
    }

    const newRequest = await PrayerRequest.create({
      message,
      user: user || 'Anonymous',
    });

    console.log("✅ New Prayer Request Created:", newRequest);

    res.status(201).json(newRequest);
  } catch (error) {
    console.error("🔥 Error in createPrayerRequest:", error.message);
    res.status(500).json({ message: 'Error creating prayer request', error: error.message });
  }
};

const getAllPrayerRequests = async (req, res) => {
  try {
    const requests = await PrayerRequest.find().sort({ createdAt: -1 });
    console.log("📥 All Prayer Requests Fetched:", requests.length);
    res.status(200).json(requests);
  } catch (error) {
    console.error("🔥 Error in getAllPrayerRequests:", error.message);
    res.status(500).json({ message: 'Error fetching prayer requests', error: error.message });
  }
};

const deletePrayerRequest = async (req, res) => {
  try {
    const deleted = await PrayerRequest.findByIdAndDelete(req.params.id);
    console.log("🗑️ Deleted Prayer Request:", deleted);
    res.status(200).json({ message: 'Prayer request deleted successfully' });
  } catch (error) {
    console.error("🔥 Error in deletePrayerRequest:", error.message);
    res.status(500).json({ message: 'Error deleting prayer request', error: error.message });
  }
};

const getPrayerRequestsByUser = async (req, res) => {
  try {
    const email = req.params.email;
    const requests = await PrayerRequest.find({ user: email }).sort({ createdAt: -1 });
    console.log(`🔍 Prayer Requests Fetched for User (${email}):`, requests.length);
    res.status(200).json(requests);
  } catch (error) {
    console.error("🔥 Error in getPrayerRequestsByUser:", error.message);
    res.status(500).json({ message: 'Error fetching prayer requests by user', error: error.message });
  }
};

module.exports = {
  createPrayerRequest,
  getAllPrayerRequests,
  deletePrayerRequest,
  getPrayerRequestsByUser,
};
