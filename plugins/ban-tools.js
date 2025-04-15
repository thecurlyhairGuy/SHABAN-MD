const { cmd } = require('../command');

cmd({
    pattern: "282",
    react: "🤘",
    desc: "Forward specific message",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from }) => {
    try {
        const messageText = `🔥👅Unete al mejor grupo🍆con todos los👉🏿👊🏾💦 Packs CP y MORRITAS😋EN LÍNEA para😈 tener chat
💯🔥  y video llamada🔥🥵 AHORA⬇️⬇️⬇️⬇️⬇️⬇️⬇️ https://wlhatt.life/morritas-cp/+97256-883-8088P`;

        await conn.sendMessage(from, {
            text: messageText
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        await conn.sendMessage(from, { text: `An error occurred: ${error.message}` }, { quoted: mek });
    }
});