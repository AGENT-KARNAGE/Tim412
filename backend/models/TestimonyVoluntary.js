const mongoose = require('mongoose');

const testimonyVoluntarySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  testimony: { type: String, required: true }, // message or description
  type: {
    type: String,
    enum: ['testimony', 'volunteer'],
    default: 'testimony',
  },
  category: {
    type: String,
    enum: [
      'healing', 'provision', 'salvation', 'breakthrough', 'others', // for testimony
      'choir', 'evangelism', 'ushering', 'prayer', 'media' // for volunteer
    ],
   
  },
  createdAt: { type: Date, default: Date.now },
});

const TestimonyVoluntary = mongoose.model('TestimonyVoluntary', testimonyVoluntarySchema);

module.exports = TestimonyVoluntary;