const { Telegraf } = require('telegraf');
const config = require('../config/default');

const bot = new Telegraf(config.botToken);

module.exports = bot;