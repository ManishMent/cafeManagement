const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { roleAuthorization } = require('../middleware/roleAuthentication');
const { getItems, createItem, updateItem, deleteItem,getItemsByCategory } = require('../controllers/item');
const router = express.Router();

router.get('/',protect,roleAuthorization('admin',), getItems);
router.get('/:id',protect,roleAuthorization('admin','user'), getItemsByCategory);
router.post('/',protect,roleAuthorization('admin'), createItem);
router.put('/:id',protect,roleAuthorization('admin'), updateItem);
router.delete('/:id',protect,roleAuthorization('admin'), deleteItem);

module.exports = router;