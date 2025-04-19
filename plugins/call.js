const { cmd } = require('../command');
const config = require("../config");

cmd({ on: "call" }, async (conn, call) => {
  try {
    if (config.ANTI_CALL !== 'true') return;

    const Msg = config.REJECT_MSG || '*_SORRY, MY BOSS IS BUSY. PLEASE DON’T CALL ME_*';

    console.log(`Incoming call from: ${call?.from}`);

    // Reject Call Node
    await conn.ws.sendNode({
      tag: 'call',
      attrs: {
        from: conn.user.id,
        to: call.from,
        id: call.id
      },
      content: [
        {
          tag: 'reject',
          attrs: {
            'call-id': call.id,
            'call-creator': call.from,
            count: '0'
          },
          content: []
        }
      ]
    });

    // Send message after rejecting
    await conn.sendMessage(call.from, { text: Msg });

  } catch (error) {
    console.error("Anti-call error:", error);
  }
});