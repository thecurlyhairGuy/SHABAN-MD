const axios = require("axios");
const config = require('../config');
const { cmd } = require('../command');
const FormData = require("form-data");
const fs = require("fs");
const { getBuffer } = require('../lib/functions'); // agar tumhara project mein helper function hai toh


cmd({
  pattern: "upscale",
  alias: ["enhance", "enh"],
  react: "🖼️",
  desc: "Upscale image via URL or replying to an image.",
  category: "tools",
  use: ".upscale <url> or reply to an image",
  filename: __filename,
},
async (conn, mek, m, {
  from, q, reply
}) => {
  try {
    let imageBuffer;

    if (q) {
      // From direct URL
      const apiURL = `https://api.siputzx.my.id/api/iloveimg/upscale?image=${encodeURIComponent(q)}`;
      const response = await axios.get(apiURL, { responseType: 'arraybuffer' });
      imageBuffer = Buffer.from(response.data, 'binary');
    } else if (m.quoted && m.quoted.mtype === 'imageMessage') {
      // From replied image
      const media = await conn.downloadMediaMessage(m.quoted);
      if (!media) return reply("Failed to download the replied image.");

      const form = new FormData();
      form.append("image", Buffer.from(media), {
        filename: "image.jpg",
        contentType: "image/jpeg"
      });

      const response = await axios.post("https://api.siputzx.my.id/api/iloveimg/upscale", form, {
        headers: form.getHeaders(),
        responseType: "arraybuffer"
      });

      imageBuffer = Buffer.from(response.data, 'binary');
    } else {
      return reply("Reply to an image or provide a direct image URL.");
    }

    await conn.sendMessage(from, {
      image: imageBuffer,
      caption: "*Image upscaled successfully!*",
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true
      }
    }, { quoted: m });

  } catch (err) {
    console.error("Upscale Error:", err);
    reply("Failed to upscale the image. Try replying to an image or providing a valid URL.");
  }
});