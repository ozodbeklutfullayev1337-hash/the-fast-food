require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  databaseUrl: process.env.DATABASE_URL,
  botToken: process.env.BOT_TOKEN,
  webappUrl: process.env.WEBAPP_URL || "http://localhost:5000"
};