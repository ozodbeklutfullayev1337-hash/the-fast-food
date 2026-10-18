const prisma = require('../database/connection');

class OrderModel {
  static async create(data) {
    return await prisma.order.create({ data });
  }

  static async getAll() {
    return await prisma.order.findMany({
      include: { user: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  static async updateStatus(id, status) {
    return await prisma.order.update({
      where: { id: Number(id) },
      data: { status }
    });
  }
}

module.exports = OrderModel;