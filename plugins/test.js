const { cmd } = require('../command');
const config = require("../config");
const owner = config.OWNER_NUMBER;
const dev = config.DEV;
const isAllowed = [owner, dev];

cmd({ 'on': "body" }, async (conn, m, store, { from, body, sender, isGroup, reply }) => {
  try {
    const private = !isGroup;
    if (!private) return;

    if (config.PM_BLOCK !== 'true') return;

    const senderNumber = sender.split('@')[0];

    // Agar sender allowed list mein hai, return kar do
    if (isAllowed.includes(senderNumber)) return;

    // Check karo agar sender store mein hai (yaani known hai)
    const isKnown = Object.keys(store.contacts).includes(sender);

    if (!isKnown) {
      await conn.sendMessage(from, { text: "🚫 You are not allowed to send messages in PM." });
      await conn.updateBlockStatus(sender, "block");
    }

  } catch (error) {
    console.error("PM Block error:", error);
    reply("❌ An error occurred while processing the message.");
  }
});