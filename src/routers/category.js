const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { roleAuthorization } = require('../middleware/roleAuthentication');
const { getCategories, getCategory,getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/category');

const router = express.Router();

// Protected route: Get logged-in user's profile
router.get('/', protect,roleAuthorization('admin','user'), getCategories);
router.get('/:id', protect,roleAuthorization('admin'), getCategoryById);
router.post('/', protect,roleAuthorization('admin'), createCategory);
router.put('/:id', protect,roleAuthorization('admin'), updateCategory);
router.delete('/:id', protect, roleAuthorization('admin'), deleteCategory);

module.exports = router;

