const prisma = require('../database/connection');

class UserModel {
  static async findOrCreate(telegramId, name) {
    let user = await prisma.user.findUnique({
      where: { telegramId: BigInt(telegramId) }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          telegramId: BigInt(telegramId),
          name: name || "Foydalanuvchi"
        }
      });
    }
    return user;
  }
}

module.exports = UserModel;