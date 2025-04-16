const {cmd , commands} = require('../command')
const fg = require('api-dylux')
const yts = require('yt-search')

cmd({
    pattern: "play4",
    alias: ["ytmp3","audio3"],
    desc: "download songs",
    category: "download",
    react: "🎵",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("*Please provide a link or a name 🔎...*")
const search = await yts(q)
const data = search.videos[0]
const url = data.url

let desc = `╭━━━〔 *SHABAN-MD* 〕━━━┈⊷
┃▸╭───────────
┃▸┃๏ *MUSIC DOWNLOADER*
┃▸└───────────···๏
╰────────────────┈⊷
╭━❮ *Download Audio* ❯━┈⊷
┃▸╭─────────────·๏
┃▸┃๏ *Tital* - ${data.title}
┃▸┃๏ *Views* - ${data.views}
┃▸┃๏ *Description* - ${data.description}
┃▸┃๏ *Duration:* ${data.timestamp}}
┃▸┃๏ *Link* - ${data.url}
┃▸┃๏ *Ago* - ${data.ago}
┃▸└────────────┈⊷
╰━━━━━━━━━━━━━━━⪼
> *© Pᴏᴡᴇʀᴇᴅ Bʏ Mʀ Sʜᴀʙᴀɴ ♡*`
await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//download audio

let down = await fg.yta(url)  
let downloadUrl = down.dl_url

//send audio
await conn.sendMessage(from,{audio:{url: downloadUrl},mimetype:"audio/mpeg"},{quoted:mek})
await conn.sendMessage(from,{document:{url: downloadUrl},mimetype:"audio/mpeg",fileName:data.title + "mp3",caption:"©ᴘᴏᴡᴇʀᴇᴅ ʙʏ Mʀ Sʜᴀʙᴀɴ"},{quoted:mek})
}catch(e){
reply(`${e}`)
}
})

//===========darama-dl===========

cmd({
    pattern: "ytmp4",
    alias: ["ytmp4", "ytmp4"],
    desc: "download video",
    category: "download",
    react: "🎥",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("*Please provide a YouTube link...*");
        
        let res = await fetch(`https://www.dark-yasiya-api.site/download/ytmp4?url=${encodeURIComponent(q)}`);
        let json = await res.json();

        if (!json.status) return reply("*Failed to fetch video data.*");

        let data = json.result.data;
        let dl = json.result.download;

        let caption = `╭━━━〔 *SHABAN-MD* 〕━━━┈⊷
┃▸╭───────────
┃▸┃๏ *VIDEO DOWNLOADER*
┃▸└───────────···๏
╰────────────────┈⊷
╭━❮ *Download Info* ❯━┈⊷
┃▸╭─────────────·๏
┃▸┃๏ *Title* - ${data.title}
┃▸┃๏ *Views* - ${data.views}
┃▸┃๏ *Description* - ${data.description}
┃▸┃๏ *Duration* - ${data.timestamp}
┃▸┃๏ *Link* - ${data.url}
┃▸┃๏ *Ago* - ${data.ago}
┃▸└────────────┈⊷
╰━━━━━━━━━━━━━━━⪼
> *© Pᴏᴡᴇʀᴇᴅ Bʏ Mʀ Sʜᴀʙᴀɴ ♡*`;

        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption }, { quoted: mek });

        await conn.sendMessage(from, {
            video: { url: dl.url },
            mimetype: "video/mp4"
        }, { quoted: mek });

        await conn.sendMessage(from, {
            document: { url: dl.url },
            mimetype: "video/mp4",
            fileName: dl.filename,
            caption: "© ᴘᴏᴡᴇʀᴇᴅ ʙʏ Mʀ Sʜᴀʙᴀɴ"
        }, { quoted: mek });

    } catch (err) {
        reply(`*Error:* ${err.message}`);
    }
});