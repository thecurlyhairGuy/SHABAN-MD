const { cmd } = require('../command');
const config = require("../config");

cmd({ 'on': "call" }, async (conn, call) => {
  try {
    if (config.ANTI_CALL !== 'true') return;
    await conn.rejectCall(call.id, call.from);
    await conn.sendMessage(call.from, { text: config.REJECT_MSG || ' *_SOORY MY BOSS IS BUSY PLEASE DONT CALL ME_* ' });
  } catch (error) {
    console.error("Anti-call error:", error);
  }
});