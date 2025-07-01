const TestimonyVoluntary = require('../models/TestimonyVoluntary.js');

export const createEntry = async (req, res) => {
  try {
    const { name, email, phone, testimony, type } = req.body;

    if (!name || !email || !phone || !testimony || !type) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const entry = await TestimonyVoluntary.create({
      name,
      email,
      phone,
      testimony,
      type,
    });

    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: 'Error creating entry', error: err.message });
  }
};

export const getAllEntries = async (req, res) => {
  try {
    const data = await TestimonyVoluntary.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching entries', error: err.message });
  }
};

export const deleteEntry = async (req, res) => {
  try {
    await TestimonyVoluntary.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting entry', error: err.message });
  }
};