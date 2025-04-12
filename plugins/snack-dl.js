const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "snackvideo",
    alias: ["snack", "snackdl", "snackvid"],
    desc: "Download SnackVideo without watermark",
    category: "downloader",
    react: "🥤",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, pushname }) => {
    try {
        if (!q) return reply("*Please provide a SnackVideo link.*");
        if (!q.includes("snackvideo.com")) return reply("*Invalid SnackVideo link provided.*");

        reply("⏳ *Fetching SnackVideo... Please wait!*");

        const { data } = await axios.get(`https://api.giftedtech.web.id/api/download/snackdl`, {
            params: {
                apikey: "gifted",
                url: q
            }
        });

        if (!data.success || !data.result) return reply("*Failed to fetch SnackVideo. Please try again later.*");

        const {
            title,
            thumbnail,
            media,
            author,
            authorImage,
            like,
            comment,
            share
        } = data.result;

        const caption = `
*⫷⦁ SHABAN-MD SNACKVIDEO DOWNLOADER ⦁⫸*

🎬 *Title:* ${title}
👤 *Creator:* ${author}
❤️ *Likes:* ${like}
💬 *Comments:* ${comment}
🔁 *Shares:* ${share}

> *Downloaded via SHABAN-MD Bot*
> *© Created by Mr-Shaban*
`.trim();

        // Send thumbnail with info
        await conn.sendMessage(from, {
            image: { url: thumbnail },
            caption: caption
        }, { quoted: mek });

        // Send the actual video
        await conn.sendMessage(from, {
            video: { url: media },
            mimetype: "video/mp4",
            caption: `*SnackVideo downloaded for you, ${pushname}!*`
        }, { quoted: mek });

    } catch (e) {
        console.error("SnackVideo Error:", e);
        reply("*Oops! An error occurred while downloading the video.*");
    }
});