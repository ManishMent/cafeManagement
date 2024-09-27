const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { roleAuthorization } = require("../middleware/roleAuthentication");
const {
    createOrder,
    getAllOrders,
    getOrderById,
    deleteOrder,
    updateOrder
} = require("../controllers/order");
const router = express.Router();

router.post('/',protect,roleAuthorization('admin', 'user'), createOrder);
router.get('/:id',protect,roleAuthorization('admin', 'user'), getOrderById);
router.get('/',protect,roleAuthorization('admin'), getAllOrders);
router.put('/:id',protect,roleAuthorization('admin'), updateOrder);
router.delete('/:id',protect,roleAuthorization('admin'), deleteOrder);

module.exports = router;