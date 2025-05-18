const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

//  Routes
const timetableRoutes = require('./routes/timetableRoutes');
const authRoutes = require('./routes/auth'); //  NEW: Google Login route

dotenv.config();
const app = express();

//  Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(' MongoDB error:', err));

//  API Routes
app.use('/api/timetable', timetableRoutes);
app.use('/api/auth', authRoutes); //  Google Login API

//  Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

//  Fallback to index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

//  Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
