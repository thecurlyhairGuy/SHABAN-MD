const { cmd } = require('../command');
const axios = require('axios');
const { getBuffer } = require('../lib/myfunc'); // agar tumhara project mein helper function hai toh

cmd({
  pattern: "swb",
  alias: ["ssweb"],
  react: "🛰️",
  desc: "Download screenshot of a given link.",
  category: "other",
  use: ".ss <link>",
  filename: __filename,
},
async (conn, mek, m, {
  from, q, reply
}) => {
  if (!q) return reply("Please provide a URL to capture a screenshot.");

  try {
    const url = `https://api.giftedtech.web.id/api/tools/ssweb?apikey=gifted&url=${encodeURIComponent(q)}`;
    const response = await axios.get(url, { responseType: 'arraybuffer' });

    const buffer = Buffer.from(response.data, 'binary');

    const imageMessage = {
      image: buffer,
      caption: "*WEB SS DOWNLOADER*\n\n> *SHABAN-MD*",
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363358310754973@newsletter',
          newsletterName: "☇MR-SHABAN",
          serverMessageId: 143,
        },
      },
    };

    await conn.sendMessage(from, imageMessage, { quoted: m });
  } catch (error) {
    console.error(error);
    reply("Failed to capture the screenshot. Please try again.");
  }
});