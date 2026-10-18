const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const ProductModel = require('../models/Product');

router.get('/orders', AdminController.getOrders);
router.patch('/orders/:id/status', AdminController.updateOrderStatus);

router.get('/products', async (req, res) => {
  const list = await ProductModel.getAll();
  res.json(list);
});
router.post('/products', AdminController.createProduct);
router.put('/products/:id', AdminController.updateProduct);
router.delete('/products/:id', AdminController.deleteProduct);

module.exports = router;