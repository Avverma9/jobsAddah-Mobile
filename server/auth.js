// auth.js

const express = require('express');
const passport = require('../path/to/passport.js');

const router = express.Router();

// Google login route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback route
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Handle successful authentication, e.g., redirect to dashboard
    res.redirect('/dashboard');
  }
);

module.exports = router;
