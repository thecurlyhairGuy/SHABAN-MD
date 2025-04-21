const ffmpeg = require('fluent-ffmpeg');
const { writeFileSync, unlinkSync, readFileSync } = require('fs');
const { tmpdir } = require('os');
const path = require('path');
const { randomUUID } = require('crypto');

const converter = {
    toAudio: async (buffer, ext) => {
        const inputPath = path.join(tmpdir(), `${randomUUID()}.${ext}`);
        const outputPath = path.join(tmpdir(), `${randomUUID()}.mp3`);
        writeFileSync(inputPath, buffer);

        return new Promise((resolve, reject) => {
            ffmpeg(inputPath)
                .toFormat('mp3')
                .on('end', () => {
                    const output = readFileSync(outputPath);
                    unlinkSync(inputPath);
                    unlinkSync(outputPath);
                    resolve(output);
                })
                .on('error', (err) => {
                    unlinkSync(inputPath);
                    reject(err);
                })
                .save(outputPath);
        });
    }
};

cmd({
    pattern: 'tomp3',
    desc: 'Convert media to audio',
    category: 'audio',
    react: '🎵',
    filename: __filename
}, async (client, match, message, { from }) => {

    if (!match.quoted) {
        return await client.sendMessage(from, {
            text: "*🔊 Please reply to a video/audio message*"
        }, { quoted: message });
    }

    if (!['videoMessage', 'audioMessage'].includes(match.quoted.mtype)) {
        return await client.sendMessage(from, {
            text: "❌ Only video/audio messages can be converted"
        }, { quoted: message });
    }

    if (match.quoted.seconds > 300) {
        return await client.sendMessage(from, {
            text: "⏱️ Media too long (max 5 minutes)"
        }, { quoted: message });
    }

    await client.sendMessage(from, {
        text: "🔄 Converting to audio..."
    }, { quoted: message });

    try {
        const buffer = await match.quoted.download();
        const ext = match.quoted.mtype === 'videoMessage' ? 'mp4' : 'm4a';
        const audio = await converter.toAudio(buffer, ext);

        await client.sendMessage(from, {
            audio: audio,
            mimetype: 'audio/mpeg'
        }, { quoted: message });

    } catch (e) {
        console.error('Conversion error:', e.message);
        await client.sendMessage(from, {
            text: "❌ Failed to process audio"
        }, { quoted: message });
    }
});