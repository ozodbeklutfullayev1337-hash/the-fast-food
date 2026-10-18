const ProductModel = require('../models/Product');
const OrderModel = require('../models/Order');

class AdminController {
  static async getOrders(req, res) {
    try {
      const orders = await OrderModel.getAll();
      const formatted = orders.map(o => ({
        ...o,
        userId: o.user.telegramId.toString()
      }));
      res.json(formatted);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateOrderStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updated = await OrderModel.updateStatus(id, status);
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createProduct(req, res) {
    try {
      const product = await ProductModel.create(req.body);
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductModel.update(id, req.body);
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      await ProductModel.delete(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AdminController;