const express = require('express');
const router = express.Router();
const { verifyToken } = require('./auth');
const Project = require('../models/Project');
const Education = require('../models/Education');
const Research = require('../models/Research');
const Profile = require('../models/Profile');
const ContactMessage = require('../models/ContactMessage');
const Movie = require('../models/Movie');

// All routes require authentication
router.use(verifyToken);

// ===== PROFILE MANAGEMENT =====
router.get('/profile', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      // Create default profile if none exists
      profile = await Profile.create({
        name: 'Likhith Vardhan Goruputi',
        bio: 'Full-Stack Software Engineer',
        email: 'likhith.goruputi@nyu.edu',
        location: 'New York, NY',
        stats: { gpa: '4.0', projects: 10, techStack: 25 }
      });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/profile', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      Object.assign(profile, req.body);
      await profile.save();
    }
    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ===== EDUCATION MANAGEMENT =====
router.get('/education', async (req, res) => {
  try {
    const education = await Education.find().sort({ order: 1 });
    res.json(education);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/education', async (req, res) => {
  try {
    const education = await Education.create(req.body);
    res.status(201).json(education);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/education/:id', async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(education);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/education/:id', async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.json({ message: 'Education deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===== RESEARCH MANAGEMENT =====
router.get('/research', async (req, res) => {
  try {
    const research = await Research.find().sort({ order: 1 });
    res.json(research);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/research', async (req, res) => {
  try {
    const research = await Research.create(req.body);
    res.status(201).json(research);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/research/:id', async (req, res) => {
  try {
    const research = await Research.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(research);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/research/:id', async (req, res) => {
  try {
    await Research.findByIdAndDelete(req.params.id);
    res.json({ message: 'Research deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===== MOVIES MANAGEMENT =====
router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/movies', async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/movies/:id', async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: 'Movie deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===== CONTACT MESSAGES =====
router.get('/messages', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/messages/:id/read', async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/messages/:id', async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
