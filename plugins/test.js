const { cmd } = require('../command');
const config = require("../config");
const warnings = {};


cmd({ 'on': "body" }, async (conn, m, store, { from, body, sender, isGroup, reply }) => {
  try {
    if (config.PM_BLOCK !== 'true') return; // Agar PM_BLOCK false hai toh return kar dein

    const private = !isGroup; // Check karein ke message private hai ya nahin
    if (!private) return; // Agar group mein message hai toh return kar dein

    await conn.sendMessage(from, { 'text': "🚫 You are not allowed to send messages in PM." });
    await conn.updateBlockStatus(sender, "block");
  } catch (error) {
    console.error("PM Block error:", error);
    reply("❌ An error occurred while processing the message.");
  }
});