const { cmd } = require('../command');
const config = require("../config");

const owner = config.OWNER_NUMBER;
const dev = config.DEV;
const isAllowed = [owner, dev];

cmd({ 'on': "body" }, async (conn, m, store, { from, sender, isGroup, reply }) => {
  try {
    if (isGroup) return;

    if (config.PM_BLOCK !== 'true') return;

    const senderNumber = sender.split('@')[0];

    // Allow owner and dev
    if (isAllowed.includes(senderNumber)) return;

    // Check agar sender number already chat mein hai ya nahi
    const chats = await conn.chatRead(sender);
    const isChatKnown = await conn.onWhatsApp(sender);

    // Agar contact unknown hai (yaani saved nahin), toh block karo
    if (!isChatKnown || isChatKnown.length === 0) {
      await conn.sendMessage(from, { text: "🚫 You are not allowed to send messages in PM." });
      await conn.updateBlockStatus(sender, "block");
    }

  } catch (error) {
    console.error("PM Block error:", error);
    reply("❌ An error occurred while processing the message.");
  }
});