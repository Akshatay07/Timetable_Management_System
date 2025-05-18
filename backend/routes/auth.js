// routes/auth.js
const express = require('express');
const { OAuth2Client } = require('google-auth-library');

const router = express.Router();

// ✅ Replace with your real Google OAuth Client ID
const CLIENT_ID = process.env.My_CLient_id;
const client = new OAuth2Client(CLIENT_ID);

router.post('/google-login', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const name = payload.name;
    const email = payload.email;

    // Optionally, store user info in DB or session

    res.status(200).json({ message: 'Login successful', name, email });
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

module.exports = router;
