const ProductModel = require('../models/Product');
const OrderModel = require('../models/Order');
const UserModel = require('../models/User');
const bot = require('../core/bot');
const prisma = require('../database/connection');

class CartController {
  static async getProducts(req, res) {
    try {
      const products = await ProductModel.getAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createOrder(req, res) {
    try {
      const { telegramId, items, totalAmount, location, phone, name } = req.body;
      
      let user = await UserModel.findOrCreate(telegramId, name);
      if (phone) {
        await prisma.user.update({
          where: { id: user.id },
          data: { phone }
        });
      }

      const order = await OrderModel.create({
        userId: user.id,
        items,
        totalAmount,
        location: location || "Ko'rsatilmagan"
      });

      try {
        await bot.telegram.sendMessage(
          telegramId,
          "Buyurtmangiz muvaffaqiyatli qabul qilindi! Kuryerimiz tez orada bog'lanadi 🍕"
        );
      } catch (e) {
        console.error("Bot xabar yuborishda xatolik:", e);
      }

      res.json({ success: true, order });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUserOrders(req, res) {
    try {
      const { telegramId } = req.params;
      const user = await prisma.user.findUnique({
        where: { telegramId: BigInt(telegramId) },
        include: { orders: { orderBy: { createdAt: 'desc' } } }
      });
      res.json(user ? user.orders : []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CartController;