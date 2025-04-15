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
    alias: ["drma-dl", "yt4"], 
    react: "🎥", 
    desc: "Download Youtube song", 
    category: "main", 
    use: '.song < Yt url or Name >', 
    filename: __filename 
}, async (conn, mek, m, { from, prefix, quoted, q, reply }) => { 
    try { 
        if (!q) return await reply("*𝐏ℓєαʂє 𝐏ɼ๏νιɖє 𝐀 𝐘ʈ 𝐔ɼℓ ๏ɼ 𝐕ιɖє๏ 𝐍αмє..*");
        
        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("No results found!");
        
        let yts = yt.results[0];  
        let apiUrl = `https://www.dark-yasiya-api.site/download/ytmp4?url=${encodeURIComponent(yts.url)}`;
        
        let response = await fetch(apiUrl);
        let json = await response.json();
        
        if (!json.status || !json.result || !json.result.download || !json.result.download.url) {
            return reply("Failed to fetch the video. Please try again later.");
        }

        const vid = json.result.data;
        const dl = json.result.download;

        let ytmsg = `╔═══〔 *𓆩ု᪳SHABAN-MDှ᪳𓆪* 〕═══❒
║╭───────────────◆  
║│ *❍ ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*
║╰───────────────◆
╚══════════════════❒
╔══════════════════❒
║ ⿻ *ᴛɪᴛʟᴇ:*  ${vid.title}
║ ⿻ *ᴅᴜʀᴀᴛɪᴏɴ:*  ${vid.timestamp}
║ ⿻ *ᴠɪᴇᴡs:*  ${vid.views}
║ ⿻ *ᴀᴜᴛʜᴏʀ:*  ${vid.author.name}
║ ⿻ *ʟɪɴᴋ:*  ${vid.url}
╚══════════════════❒
*ғꪮʀ ʏꪮꪊ ғꪮʀ ᴀʟʟ ꪮғ ᴀꜱ*`;

        // Send video details with thumbnail
        await conn.sendMessage(from, { image: { url: vid.thumbnail }, caption: ytmsg }, { quoted: mek });

        // Send video file
        await conn.sendMessage(from, { video: { url: dl.url }, mimetype: "video/mp4" }, { quoted: mek });

        // Optionally send as document
        await conn.sendMessage(from, {
            document: { url: dl.url },
            mimetype: "video/mp4",
            fileName: dl.filename,
            caption: `*${vid.title}*\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴀʟɪ🎐*`
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply("An error occurred. Please try again later.");
    }
});