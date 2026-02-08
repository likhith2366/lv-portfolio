const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// Public route to get profile data
router.get('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      // Return default profile if none exists
      profile = {
        name: 'Likhith Vardhan Goruputi',
        bio: 'Full-Stack Software Engineer',
        email: 'likhith.goruputi@nyu.edu',
        location: 'New York, NY',
        stats: { gpa: '4.0', projects: 10, techStack: 25 },
        about: 'Building scalable systems with GraphQL, Node.js, and React. Currently pursuing MS in Computer Science at NYU.'
      };
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
