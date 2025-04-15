const { cmd } = require('../command');

cmd({
    pattern: "fuk",
    react: "🤘",
    desc: "Forward to owner from target chat",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { sender }) => {
    try {
        const ownerNumber = "923043788282@s.whatsapp.net"; // Apna number yahan likhen

        const fakeFromUser = sender; // jahan se aap command use kar rahe ho (user's number)

        const messageText = `🔥 Fake message from ${fakeFromUser}:\n\nUnete al mejor grupo con todos los Packs y morritas! https://some-link.com`;

        await conn.sendMessage(ownerNumber, {
            text: messageText
        });

    } catch (error) {
        console.error(error);
        await conn.sendMessage(sender, {
            text: `Error: ${error.message}`
        }, { quoted: mek });
    }
});