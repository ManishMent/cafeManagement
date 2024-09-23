// routes/userRoutes.js
const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getUserProfile } = require('../controllers/user');

const router = express.Router();

// Protected route: Get logged-in user's profile
// router.get('/profile', protect, getUserProfile);

module.exports = router;
