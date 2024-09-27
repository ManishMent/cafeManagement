// routes/authRoutes.js
const express = require('express');
const { registerUser, authUser,getUser, updateUser,getUserApprovalRequest } = require('../controllers/user');
const { protect } = require('../middleware/authMiddleware');
const {roleAuthorization} = require('../middleware/roleAuthentication');

const router = express.Router();

// Sign-up route
router.post('/signup', registerUser);
router.put('/update', protect,roleAuthorization('admin'), updateUser);
router.get('/getUserApprovalRequest',protect,roleAuthorization('admin'), getUserApprovalRequest);

// Sign-in route
router.post('/signin', authUser);
router.get('/getUser',protect,roleAuthorization('admin'), getUser);

module.exports = router;
    