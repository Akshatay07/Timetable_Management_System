const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  semester: { type: String, required: true },
  section: { type: String, required: true },
  day: { type: String, required: true },
  timeSlot: { type: String, required: true },
  subject: { type: String, required: true },
  teacher: { type: String, required: true }
});

module.exports = mongoose.model('Timetable', timetableSchema);
