const express = require('express');
const router = express.Router();
const Timetable = require('../models/Timetable');

//  CREATE - Add a timetable entry
router.post('/add', async (req, res) => {
  try {
    const newEntry = new Timetable(req.body);
    await newEntry.save();
    res.status(201).json({ message: 'Timetable entry added.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//BULK UPLOAD - Add multiple timetable entries
router.post('/add-bulk', async (req, res) => {
    try {
      if (!Array.isArray(req.body)) {
        return res.status(400).json({ error: 'Invalid format. Expecting an array.' });
      }
      await Timetable.insertMany(req.body);
      res.status(201).json({ message: `${req.body.length} entries uploaded.` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
//READ - Get entries with optional filters
router.get('/', async (req, res) => {
  try {
    const filters = {};
    if (req.query.semester) filters.semester = req.query.semester;
    if (req.query.section) filters.section = req.query.section;
    if (req.query.day) filters.day = req.query.day;

    const entries = await Timetable.find(filters);
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//UPDATE - Modify a timetable entry
router.put('/:id', async (req, res) => {
  try {
    const updated = await Timetable.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE - Remove a timetable entry
router.delete('/:id', async (req, res) => {
  try {
    await Timetable.findByIdAndDelete(req.params.id);
    res.json({ message: 'Entry deleted.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
