const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);
const { UserModel } = require('../models/User');

bot.start(async (ctx) => {
    const tgId = ctx.from.id;
    const name = `${ctx.from.first_name || ''} ${ctx.from.last_name || ''}`.trim();
    
    try {
        await UserModel.findOrCreate(tgId, name);
    } catch (e) {}

    await ctx.reply(
        `Assalomu alaykum, ${name}! 🍔\n"The Fast Food" yetkazib berish xizmatiga xush kelibsiz. Eng sersuv burgerlar va hot-doglarga buyurtma berish uchun quyidagi tugmani bosing:`,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { 
                            text: "🚀 Menuni Ochish (Mini App)", 
                            web_app: { url: process.env.WEBAPP_URL + "/mini-app" } 
                        }
                    ]
                ]
            }
        }
    );
});

module.exports = bot;