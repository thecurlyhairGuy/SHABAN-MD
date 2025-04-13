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
      // Image from URL
      const apiURL = `https://api.siputzx.my.id/api/iloveimg/upscale?image=${encodeURIComponent(q)}`;
      const response = await axios.get(apiURL, { responseType: 'arraybuffer' });
      imageBuffer = Buffer.from(response.data, 'binary');
    } else if (m.quoted && /image/.test(m.quoted.mtype)) {
      // Replied image
      console.log("Trying to download quoted image...");
      const img = await conn.downloadMediaMessage(m.quoted);
      if (!img) {
        console.log("Image download failed.");
        return reply("Couldn't download the image. Try again.");
      }

      const form = new FormData();
      form.append("image", img, {
        filename: "upscale.jpg",
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
    console.error("Upscale Error:", err.message || err);
    reply("Failed to upscale the image. Try replying to an image or providing a valid URL.");
  }
});