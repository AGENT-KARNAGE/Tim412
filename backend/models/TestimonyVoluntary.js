import mongoose from 'mongoose';

const testimonyVoluntarySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true }, // ✅ Added phone
  testimony: { type: String, required: true }, // This holds the "interest" or the message
  type: { type: String, enum: ['testimony', 'volunteer'], default: 'testimony' },
  createdAt: { type: Date, default: Date.now }
});

const TestimonyVoluntary = mongoose.model('TestimonyVoluntary', testimonyVoluntarySchema);

export default TestimonyVoluntary;