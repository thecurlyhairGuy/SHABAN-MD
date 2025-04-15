const {cmd , commands} = require('../command')
const yts = require('yt-search')
const axios = require("axios");

cmd({
    pattern: "play5",
    desc: "To download songs.",
    react: "🎵",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try {
    if (!q) return reply("Please give me a url or title");

    const search = await yts(q);
    const data = search.videos[0];
    const url = data.url;

    let desc = `
*⫷⦁SHABAN-MD MUSⵊC DOWNLOADⵊNG⦁⫸*

🎵 *MUSⵊC FOUND!* 

➥ *Title:* ${data.title} 
➥ *Duration:* ${data.timestamp} 
➥ *Views:* ${data.views} 
➥ *Uploaded On:* ${data.ago} 
➥ *Link:* ${data.url} 

🎧 *ENJOY THE MUSIC BROUGHT TO YOU!*

> *SHABAN-MD WHATSAPP BOT* 
> *© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍʀ-sʜᴀʙᴀɴ* 
`;

    await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

    // Use new API
    let apiRes = await fetch(`https://api.giftedtech.web.id/api/download/ytmp3?apikey=gifted&url=${encodeURIComponent(url)}`);
    let json = await apiRes.json();

    if (!json.success) return reply("Failed to fetch audio from new API");

    let downloadUrl = json.result.download_url;

    await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
    await conn.sendMessage(from, {
        document: { url: downloadUrl },
        mimetype: "audio/mpeg",
        fileName: json.result.title + ".mp3",
        caption: "*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍʀ-sʜᴀʙᴀɴ*"
    }, { quoted: mek });

} catch (e) {
    console.log(e);
    reply(`_Hi ${pushname}, retry later_`);
}
})

//====================video_dl=======================

cmd({
    pattern: "darama5",
    alias: ["video5"],
    desc: "To download videos.",
    react: "🎥",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try {
    if (!q) return reply("Please give me a url or title");

    const search = await yts(q);
    const data = search.videos[0];
    const url = data.url;

    let desc = `
*⫷⦁SHABAN-MD VⵊDEO DOWNLOADⵊNG⦁⫸*

🎥 *VⵊDEO FOUND!* 

➥ *Title:* ${data.title} 
➥ *Duration:* ${data.timestamp} 
➥ *Views:* ${data.views} 
➥ *Uploaded On:* ${data.ago} 
➥ *Link:* ${data.url} 

🎬 *ENJOY THE VIDEO BROUGHT TO YOU!*

> *SHABAN-MD WHATSAPP BOT* 
> *© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍʀ-sʜᴀʙᴀɴ*
`;

    await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

    // Use new API
    let apiRes = await fetch(`https://api.giftedtech.web.id/api/download/dlmp4?apikey=gifted&url=${encodeURIComponent(url)}`);
    let json = await apiRes.json();

    if (!json.success) return reply("Failed to fetch video from new API");

    let downloadUrl = json.result.download_url;

    await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });
    await conn.sendMessage(from, {
        document: { url: downloadUrl },
        mimetype: "video/mp4",
        fileName: json.result.title + ".mp4",
        caption: "*© SHABAN-MD*"
    }, { quoted: mek });

} catch (e) {
    console.log(e);
    reply(`_Hi ${pushname}, retry later_`);
}
})

//drama-dl

cmd({
    pattern: "darama",
    alias: ["drma-dl"],
    desc: "To download videos.",
    react: "⚡",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply, connWait}) => {
try {
    if (!q) return reply("⚠️ Please provide a YouTube title or link.");

    const search = await yts(q);
    const data = search.videos[0];
    const url = data.url;

    await conn.sendMessage(from, {
        image: { url: data.thumbnail },
        caption: `🎬 *VIDEO FOUND*

• Title: ${data.title}
• Duration: ${data.timestamp}
• Views: ${data.views}
• Uploaded: ${data.ago}
• URL: ${data.url}

⏳ Getting quality options...`
    }, { quoted: mek });

    // Call the API
    const res = await fetch(`https://www.dark-yasiya-api.site/download/ytmp4?url=${encodeURIComponent(url)}`);
    const json = await res.json();

    if (!json.status) return reply("❌ Failed to fetch video info.");

    const availableQualities = json.result.download.availableQuality;

    let qualityList = availableQualities.map((q, i) => `${i + 1}. ${q}p`).join("\n");
    await reply(`✨ *Select a quality:*\n\n${qualityList}\n\n📥 Reply with the number of your choice.`);

    const userReply = await conn.waitForMessage(from);
    const selectedIndex = parseInt(userReply.message?.conversation?.trim()) - 1;

    if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= availableQualities.length) {
        return reply("⚠️ Invalid selection. Please reply with a valid number.");
    }

    const selectedQuality = availableQualities[selectedIndex];

    // Fetch again with selected quality
    const finalRes = await fetch(`https://www.dark-yasiya-api.site/download/ytmp4?url=${encodeURIComponent(url)}&quality=${selectedQuality}`);
    const finalJson = await finalRes.json();

    if (!finalJson.status) return reply("❌ Could not get the video at selected quality.");

    const finalDownload = finalJson.result.download;

    await conn.sendMessage(from, {
        video: { url: finalDownload.url },
        mimetype: "video/mp4",
        caption: `✅ *Download Complete*

• Title: ${json.result.data.title}
• Quality: ${selectedQuality}p

— Delivered by *SHABAN-MD BOT*`
    }, { quoted: mek });

    await conn.sendMessage(from, {
        document: { url: finalDownload.url },
        mimetype: "video/mp4",
        fileName: finalDownload.filename,
        caption: "📦 Here's your file. Enjoy!"
    }, { quoted: mek });

} catch (e) {
    console.log(e);
    reply(`⚠️ Error: Please try again later, ${pushname}.`);
}
})