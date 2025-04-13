const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "sptdl",
    alias: ["spotifydl", "spotidown"],
    desc: "Download Spotify music as MP3",
    category: "downloader",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, pushname }) => {
    try {
        if (!q) return reply("*Please provide a Spotify link.*");
        if (!q.includes("spotify.com")) return reply("*Invalid Spotify link provided.*");

        reply("⏳ *Fetching Spotify track... Please wait!*");

        const { data } = await axios.get(`https://api.genux.me/api/download/spotify`, {
            params: { url: q }
        });

        if (!data.status || !data.result) return reply("*Failed to fetch Spotify track. Please try again later.*");

        const {
            title,
            type,
            artists,
            cover,
            music
        } = data.result;

        const caption = `
*⫷⦁ SPOTIFY DOWNLOADER ⦁⫸*

🎵 *Title:* ${title}
🧑‍🎤 *Artists:* ${artists}
🎶 *Type:* ${type}

> *DOWNLOADED BY SHABAN-MD*
> *© CREATED BY MR-SHABAN*
`.trim();

        // Send cover image with info
        await conn.sendMessage(from, {
            image: { url: cover },
            caption: caption
        }, { quoted: mek });

        // Send the actual MP3 file
        await conn.sendMessage(from, {
            audio: { url: music },
            mimetype: "audio/mpeg",
            ptt: false
        }, { quoted: mek });

    } catch (e) {
        console.error("Spotify Download Error:", e);
        reply("*Oops! An error occurred while downloading the Spotify track.*");
    }
});