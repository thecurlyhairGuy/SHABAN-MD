const {cmd , commands} = require('../command')
const yts = require('yt-search')
const axios = require("axios");

cmd({
    pattern: "xxx",
    alias: ["xnxx"],
    desc: "To download videos.",
    react: "🤤",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try {
    if (!q) return reply("Please provide a valid URL to download the video.");

    // Fetch from new XNXX downloader API
    const api = await fetch(`https://api.giftedtech.web.id/api/download/xnxxdl?apikey=gifted&url=${encodeURIComponent(q)}`);
    const json = await api.json();

    if (!json.success) return reply("Failed to fetch video info.");

    const res = json.result;
    const videoUrl = res.files.high;

    let caption = `
*⫷⦁XNXX VⵊDEO⦁⫸*

🎥 *Title:* ${res.title}
⏱️ *Duration:* ${res.duration} seconds
📊 *Info:* ${res.info}
🔗 *Link:* ${res.URL}

> *SHABAN-MD WHATSAPP BOT*
> *© Created by Mr-Shaban*
`;

    // Send thumbnail with caption
    await conn.sendMessage(from, { image: { url: res.image }, caption }, { quoted: mek });

    // Send only as document
    await conn.sendMessage(from, {
        document: { url: videoUrl },
        mimetype: "video/mp4",
        fileName: `${res.title}.mp4`,
        caption: "*© SHABAN-MD*"
    }, { quoted: mek });

} catch (e) {
    console.log(e);
    reply(`_Hi ${pushname}, an error occurred. Please try again later._`);
}
});