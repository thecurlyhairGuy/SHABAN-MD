const { cmd } = require('../command');
const config = require("../config");
const warnings = {};
const owner = config.OWNER_NUMBER;
const dev = config.DEV;
const isAllowed = [owner, dev];

cmd({ 'on': "body" }, async (conn, m, store, { from, body, sender, isGroup, reply }) => {
  try {
    const private = !isGroup; // Check karein ke message private hai ya nahin
    if (!private) return; // Agar group mein message hai toh return kar dein

    if (config.PM_BLOCK !== 'true' || isAllowed.includes(sender.split('@')[0])) return; // Agar PM_BLOCK false hai ya owner aur dev number hai toh return kar dein

    await conn.sendMessage(from, { 'text': "🚫 You are not allowed to send messages in PM." });
    await conn.updateBlockStatus(sender, "block");
  } catch (error) {
    console.error("PM Block error:", error);
    reply("❌ An error occurred while processing the message.");
  }
});