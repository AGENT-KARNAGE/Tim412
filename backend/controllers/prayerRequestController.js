import PrayerRequest from '../models/PrayerRequest.js';

export const createPrayerRequest = async (req, res) => {
  try {
    const { message, user } = req.body;
    if (!message || message.trim() === '') {
      return res.status(400).json({ message: 'Prayer message is required' });
    }

    const newRequest = await PrayerRequest.create({
      message,
      user: user || 'Anonymous',
    });

    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error creating prayer request', error: error.message });
  }
};

export const getAllPrayerRequests = async (req, res) => {
  try {
    const requests = await PrayerRequest.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prayer requests', error: error.message });
  }
};

export const deletePrayerRequest = async (req, res) => {
  try {
    await PrayerRequest.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Prayer request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting prayer request', error: error.message });
  }
};