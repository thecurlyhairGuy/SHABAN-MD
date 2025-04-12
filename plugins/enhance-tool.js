const axios = require("axios");
const config = require('../config');
const { cmd } = require('../command');
const { getBuffer } = require('../lib/functions'); // agar tumhara project mein helper function hai toh

cmd({
  pattern: "enhance",
  alias: ["enh"],
  react: "✨",
  desc: "Enhance a given image URL.",
  category: "tools",
  use: ".enhance <image-url>",
  filename: __filename,
},
async (conn, mek, m, {
  from, q, reply
}) => {
  if (!q) return reply("Please provide a direct image URL to enhance.");

  try {
    const url = `https://bk9.fun/tools/enhance?url=${encodeURIComponent(q)}`;
    const response = await axios.get(url, { responseType: 'arraybuffer' });

    const buffer = Buffer.from(response.data, 'binary');

    const imageMessage = {
      image: buffer,
      caption: "*IMAGE ENHANCED SUCCESSFULLY*\n\n> *SHABAN-MD POWERED*",
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
    reply("Failed to enhance the image. Please make sure the image URL is valid.");
  }
});