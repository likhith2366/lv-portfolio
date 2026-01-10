const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');

// Public route to submit contact form
router.post('/', async (req, res) => {
  try {
    const message = await ContactMessage.create(req.body);
    res.status(201).json({ message: 'Message sent successfully', id: message._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
