require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bot = require('./controllers/botController');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Statik fayllar (Frontend va Admin Panel)
app.use(express.static(path.join(__dirname, '../public')));

// 1. Mini App sahifasini ochish uchun route
app.get('/mini-app', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/mini-app/index.html'));
});

// 2. Admin Panel sahifasini ochish uchun route
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/admin/index.html'));
});

// ================= API ENDPOINTS =================

// Barcha taomlarni olish
app.get('/api/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Taomlarni olishda xatolik yuz berdi" });
    }
});

// Yangi buyurtma yaratish va Telegram bot orqali Adminga xabar yuborish
app.post('/api/orders', async (req, res) => {
    try {
        const { telegramId, name, phone, location, totalAmount, items } = req.body;
        
        // Foydalanuvchini topish yoki yaratish
        let user = await prisma.user.findUnique({ where: { telegramId: String(telegramId) } });
        if (!user) {
            user = await prisma.user.create({
                data: { telegramId: String(telegramId), name: name || "Mijoz", phone }
            });
        }

        // Buyurtmani bazaga yozish
        const order = await prisma.order.create({
            data: {
                userId: user.id,
                location,
                totalAmount: Number(totalAmount),
                status: 'kutilmoqda',
                items: JSON.stringify(items)
            }
        });

        // Adminga (6515742580) Telegram orqali bildirishnoma yuborish
        const ADMIN_ID = "6515742580";
        let itemsListText = items.map(i => `• ${i.name} (${i.qty} ta) — ${Number(i.price * i.qty).toLocaleString('uz-UZ')} so'm`).join('\n');
        
        const notificationText = `🚨 <b>YANGI BUYURTMA! #${order.id}</b>\n\n` +
            `👤 <b>Mijoz:</b> ${name}\n` +
            `📞 <b>Telefon:</b> ${phone}\n` +
            `📍 <b>Manzil:</b> ${location}\n\n` +
            `🛒 <b>Buyurtmalar:</b>\n${itemsListText}\n\n` +
            `💰 <b>Jami summa:</b> ${Number(totalAmount).toLocaleString('uz-UZ')} so'm\n` +
            `⚡ Holati: <i>Kutilmoqda</i>`;

        try {
            await bot.telegram.sendMessage(ADMIN_ID, notificationText, { parse_mode: 'HTML' });
        } catch (botErr) {
            console.error("Adminga xabar yuborishda xatolik:", botErr);
        }

        res.json({ success: true, orderId: order.id });
    } catch (error) {
        console.error("Buyurtma yaratish xatoligi:", error);
        res.status(500).json({ error: "Buyurtmani saqlashda xatolik" });
    }
});

// Foydalanuvchining o'z buyurtmalarini ko'rishi
app.get('/api/orders/:telegramId', async (req, res) => {
    try {
        const { telegramId } = req.params;
        const user = await prisma.user.findUnique({ where: { telegramId: String(telegramId) } });
        if (!user) return res.json([]);

        const orders = await prisma.order.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' }
        });
        res.json(orders);
    } catch (e) {
        res.status(500).json({ error: "Xatolik" });
    }
});

// ================= ADMIN API =================

app.get('/api/admin/orders', async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: { user: true },
            orderBy: { createdAt: 'desc' }
        });
        res.json(orders);
    } catch (e) {
        res.status(500).json({ error: "Xatolik" });
    }
});

app.get('/api/admin/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (e) {
        res.status(500).json({ error: "Xatolik" });
    }
});

app.post('/api/admin/products', async (req, res) => {
    try {
        const { name, description, image, oldPrice, newPrice, category } = req.body;
        const product = await prisma.product.create({
            data: { name, description, image, oldPrice: Number(oldPrice), newPrice: Number(newPrice), category }
        });
        res.json(product);
    } catch (e) {
        res.status(500).json({ error: "Xatolik" });
    }
});

app.delete('/api/admin/products/:id', async (req, res) => {
    try {
        await prisma.product.delete({ where: { id: Number(req.params.id) } });
        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ error: "Xatolik" });
    }
});

app.patch('/api/admin/orders/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const order = await prisma.order.update({
            where: { id: Number(req.params.id) },
            data: { status }
        });
        res.json(order);
    } catch (e) {
        res.status(500).json({ error: "Xatolik" });
    }
});

// ================= SERVER VA BOTNI ISHGA TUSHIRISH =================

app.listen(PORT, () => {
    console.log(`Server ishga tushdi: http://localhost:${PORT}`);
});

// Telegram botni ishga tushirish
bot.launch().then(() => {
    console.log("Telegram Bot muvaffaqiyatli ishga tushdi va ulandi!");
}).catch(err => {
    console.error("Botni ishga tushirishda xatolik:", err);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
