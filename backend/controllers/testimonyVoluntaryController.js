const TestimonyVoluntary = require('../models/TestimonyVoluntary');

// ✅ CREATE ENTRY
const createEntry = async (req, res) => {
  try {
    const { name, email, phone, testimony, type, category } = req.body;

    console.log('📝 Received testimony submission:', req.body);
    
    // Basic validation
    if (!name || !email || !phone || !testimony) {
      console.log(`📥 All fields are required.`);
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // 🔒 Check for existing volunteer (same name + email)
    if (type === 'volunteer'){
      const existing = await TestimonyVoluntary.find({
        name,
        email,
        type: "volunteer" // Make sure it's a volunteer entry
      })
    }

    if(existing){
      console.log("🚫 Duplicate volunteer entry detected");
      return res.status(409).json({ message: 'You have already volunteered. Thank you!' });
    }

    const entry = await TestimonyVoluntary.create({
      name,
      email,
      phone,
      testimony,
      type: type || 'testimony', // optional, will default
      ...(category && { category }) ,
    });

    console.log('✅ Entry saved successfully:', entry);
    res.status(201).json(entry);
  } catch (err) {
    console.error('🔥 Error creating entry:', err.message);
    res.status(500).json({ message: 'Error creating entry', error: err.message });
  }
};

// ✅ GET ALL ENTRIES
const getAllEntries = async (req, res) => {
  try {
    const data = await TestimonyVoluntary.find().sort({ createdAt: -1 });
    console.log(`📥 Retrieved ${data.length} testimony entries`);
    res.status(200).json(data);
  } catch (err) {
    console.error("🔥 Error fetching entries:", err.message);
    res.status(500).json({ message: 'Error fetching entries', error: err.message });
  }
};

// ✅ DELETE ENTRY
const deleteEntry = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("🗑️ Attempting to delete entry with ID:", id);

    const deleted = await TestimonyVoluntary.findByIdAndDelete(id);
    if (!deleted) {
      console.log("❌ No entry found with ID:", id);
      return res.status(404).json({ message: 'Entry not found' });
    }

    console.log("✅ Testimony deleted successfully:", deleted);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error("🔥 Error deleting entry:", err.message);
    res.status(500).json({ message: 'Error deleting entry', error: err.message });
  }
};

module.exports = { createEntry, getAllEntries, deleteEntry };
