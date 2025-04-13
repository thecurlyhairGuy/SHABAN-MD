const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const { getBuffer } = require('../lib/functions'); // agar tumhara project mein helper function hai toh

cmd({
  pattern: "upscale",
  alias: ["enhance", "enh"],
  react: "🖼️",
  desc: "Upscale a given image via URL or by replying to an image.",
  category: "tools",
  use: ".upscale <image-url> (or reply to an image)",
  filename: __filename,
},
async (conn, mek, m, {
  from, q, reply
}) => {
  let imageBuffer;

  try {
    if (q) {
      // If user gave an image URL
      const apiURL = `https://api.siputzx.my.id/api/iloveimg/upscale?image=${encodeURIComponent(q)}`;
      const response = await axios.get(apiURL, { responseType: 'arraybuffer' });
      imageBuffer = Buffer.from(response.data, 'binary');
    } else if (m.quoted && m.quoted.mtype === 'imageMessage') {
      // If user replied to an image
      const img = await conn.downloadMediaMessage(m.quoted);
      const form = new FormData();
      form.append("image", img, {
        filename: "input.jpg",
        contentType: "image/jpeg"
      });

      const response = await axios.post("https://api.siputzx.my.id/api/iloveimg/upscale", form, {
        headers: form.getHeaders(),
        responseType: "arraybuffer"
      });

      imageBuffer = Buffer.from(response.data, "binary");
    } else {
      return reply("Please provide an image URL or reply to an image.");
    }

    const imageMessage = {
      image: imageBuffer,
      caption: "*IMAGE UPSCALED SUCCESSFULLY*\n\n> *SHABAN-MD POWERED*",
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
    console.error("Upscale Error:", error?.response?.data || error.message);
    reply("Failed to upscale the image. Try replying to an image or providing a valid URL.");
  }
});