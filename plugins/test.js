const { cmd } = require('../command');
const config = require("../config");

const owner = config.OWNER_NUMBER;
const dev = config.DEV;
const isAllowed = [owner, dev];

cmd({ 'on': "body" }, async (conn, m, store, { from, sender, isGroup, reply }) => {
  try {
    if (isGroup) return;

    if (config.PM_BLOCK !== 'true') return;

    const senderJid = sender; // e.g. 923123456789@s.whatsapp.net
    const senderNumber = sender.split('@')[0];

    if (isAllowed.includes(senderNumber)) return;

    const isKnown = store.contacts?.[senderJid];

    if (!isKnown) {
      await conn.sendMessage(from, { text: "🚫 You are not allowed to send messages in PM." });
      await conn.updateBlockStatus(sender, "block");
    }

  } catch (error) {
    console.error("PM Block error:", error);
    reply("❌ An error occurred while processing the message.");
  }
});