const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.product.deleteMany();

    const products = [
        // 1. GAMBURGERLAR
        {
            name: "Double Smash Cheeseburger",
            description: "Ikki qavatli 100% marmar mol go'shti kotleti, eritilgan Amerika cheddar pishlog'i, karamelizatsiya qilingan piyoz, tuzlangan bodring va maxsus tutunli burger sousi yumshoq briosh nonida.",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=85",
            oldPrice: 65000,
            newPrice: 52000,
            category: "Burgerlar"
        },
        {
            name: "Crispy Chicken & Cheese Burger",
            description: "Maxsus 11 xil ziravorli qarsildoq panirovkadagi sersuv tovuq filesi, yangi aysberg salati, cheddar pishlog'i va sarimsoqli ranch sousi.",
            image: "https://images.unsplash.com/photo-1615297928064-24977384d0da?auto=format&fit=crop&w=1000&q=85",
            oldPrice: 55000,
            newPrice: 44000,
            category: "Burgerlar"
        },
        {
            name: "Black Angus Truffle Burger",
            description: "Qora kunjutli maxsus non, qalin Angus kotleti, qo'ziqorinli julen, ikki hissa gouda pishlog'i va qarsildoq piyoz halqachalari.",
            image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1000&q=85",
            oldPrice: 78000,
            newPrice: 64000,
            category: "Burgerlar"
        },

        // 2. HOT-DOGLAR
        {
            name: "New York Chili Cheese Hot-Dog",
            description: "Grilda qizartirilgan 22 sm lik dudlangan kolbasa, ustidan quyilgan issiq cheddar pishloq sousi, mayda to'g'ralgan mol go'shtli chili, xalapenyo va qarsildoq piyoz.",
            image: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=1000&q=85",
            oldPrice: 45000,
            newPrice: 36000,
            category: "Hot-Doglar"
        },
        {
            name: "Royal Double Sausage Hot-Dog",
            description: "Yumshoq sutli baget ichida ikki dona maxsus sosiska, shirin xantal (gorchitsa), ketchup, mayonez, koreyscha sabzi va eritilgan mozzarella.",
            image: "https://images.unsplash.com/photo-1541214113241-21578d2d9b62?auto=format&fit=crop&w=1000&q=85",
            oldPrice: 42000,
            newPrice: 33000,
            category: "Hot-Doglar"
        },
        {
            name: "BBQ Crispy Bacon Hot-Dog",
            description: "Ochiq olovda pishgan bavariya kolbasasi, qarsildoq halol kurka bekoni, tutunli barbekyu sousi va pishloqli sous.",
            image: "https://images.unsplash.com/photo-1627054245708-29c06640d50f?auto=format&fit=crop&w=1000&q=85",
            oldPrice: 48000,
            newPrice: 39000,
            category: "Hot-Doglar"
        },

        // 3. LAVASH VA SENDVICHLAR
        {
            name: "Tandirli Pishloqli Lavash",
            description: "Yupqa qarsildoq xamir ichida sersuv mol go'shti doneri, yangi pomidor, bodring, chipslar, maxsus oq sous va mo'l-ko'l eritilgan pishloq.",
            image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1000&q=85",
            oldPrice: 46000,
            newPrice: 38000,
            category: "Lavash & Sendvich"
        },
        {
            name: "Triple Club Sandwich + Fri",
            description: "Uch qavatli qarsildoq tost noni, grilda pishgan tovuq filesi, dudlangan kurka, pishloq, yangi pomidor, aysberg va 100 gr oltinrang kartoshka fri bilan.",
            image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1000&q=85",
            oldPrice: 52000,
            newPrice: 43000,
            category: "Lavash & Sendvich"
        },

        // 4. PITSALAR
        {
            name: "Super Pepperoni & Cheese",
            description: "Haqiqiy italyan mozzarella pishlog'i cho'ziluvchan qatlami, ikki hissa dudlangan peperoni kolbasalari va oregano sepilgan pomidor sousi.",
            image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=1000&q=85",
            oldPrice: 95000,
            newPrice: 79000,
            category: "Pitsa"
        },
        {
            name: "Meat Lovers (4 xil go'shtli)",
            description: "Qazi, mol go'shti qiymasi, tovuq filesi va peperoni kolbasasi, shirin bulg'or qalampiri va barbekyu sousi bilan boyitilgan to'yimli pitsa.",
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=85",
            oldPrice: 115000,
            newPrice: 94000,
            category: "Pitsa"
        },

        // 5. SNEKLAR & KARTOSHKA FRI
        {
            name: "Loaded Cheese & Jalapeño Fries",
            description: "Tashqarisi qarsildoq, ichi yumshoq oltinrang kartoshka fri, ustidan issiq cheddar pishloq sousi va xalapenyo bo'laklari quyilgan.",
            image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1000&q=85",
            oldPrice: 35000,
            newPrice: 26000,
            category: "Fri & Sneklar"
        },
        {
            name: "Crispy Buffalo Wings (8 dona)",
            description: "Qarsildoq panirovkada qovurilgan sersuv tovuq qanotchalari, shirin-achchiq glazur va maxsus pishloqli sous bilan.",
            image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=1000&q=85",
            oldPrice: 54000,
            newPrice: 45000,
            category: "Fri & Sneklar"
        }
    ];

    for (const p of products) {
        await prisma.product.create({ data: p });
    }

    console.log("12 xil Ultra-Realistic Fast Food taomlari bazaga muvaffaqiyatli yozildi!");
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());