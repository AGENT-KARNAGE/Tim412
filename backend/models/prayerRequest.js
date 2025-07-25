const mongoose = require('mongoose');

const prayerRequestSchema = new mongoose.Schema({
  message: { type: String, required: true },
  user: { type: String, default: 'Anonymous' },
  createdAt: { type: Date, default: Date.now },
});

const PrayerRequest = mongoose.model('PrayerRequest', prayerRequestSchema);

module.exports = PrayerRequest;