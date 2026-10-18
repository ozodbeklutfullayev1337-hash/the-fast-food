const prisma = require('../database/connection');

class ProductModel {
  static async getAll() {
    return await prisma.product.findMany();
  }

  static async create(data) {
    return await prisma.product.create({ data });
  }

  static async update(id, data) {
    return await prisma.product.update({
      where: { id: Number(id) },
      data
    });
  }

  static async delete(id) {
    return await prisma.product.delete({
      where: { id: Number(id) }
    });
  }
}

module.exports = ProductModel;