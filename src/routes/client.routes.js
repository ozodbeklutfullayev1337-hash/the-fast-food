const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');

router.get('/products', CartController.getProducts);
router.post('/orders', CartController.createOrder);
router.get('/orders/:telegramId', CartController.getUserOrders);
module.exports = router;