const config = require("../config");
const owner = config.OWNER_NUMBER;
const dev = config.DEV;
const isAllowed = [owner, dev];

module.exports = (conn) => {
  const { cmd } = require('../command');

  cmd({ on: "body" }, async (conn, m, store, { from, sender, isGroup, reply }) => {
    console.log("⚠️ PM Block triggered"); // Debug: Is trigger working?

    try {
      if (isGroup) return;

      if (config.PM_BLOCK !== 'true') return;

      const senderNumber = sender.split('@')[0];
      if (isAllowed.includes(senderNumber)) return;

      const known = Object.keys(conn.chats || {}).includes(sender);

      console.log(`Sender: ${sender}`);
      console.log(`Is Known Contact? ${known}`);

      if (!known) {
        await conn.sendMessage(from, { text: "🚫 You are not allowed to send messages in PM." });
        await conn.updateBlockStatus(sender, "block");
      }
    } catch (error) {
      console.error("PM Block error:", error);
      reply("❌ An error occurred while processing the message.");
    }
  });
};