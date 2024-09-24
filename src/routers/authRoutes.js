// routes/authRoutes.js
const express = require('express');
const { registerUser, authUser,getUser } = require('../controllers/user');
const { protect } = require('../middleware/authMiddleware');
const {roleAuthorization} = require('../middleware/roleAuthentication');

const router = express.Router();

// Sign-up route
router.post('/signup', registerUser);

// Sign-in route
router.post('/signin', authUser);
router.get('/getUser',protect,roleAuthorization('admin'), getUser);

module.exports = router;
    