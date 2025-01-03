
const { cmd } = require('../command'); // Ensure the path is correct
const { fetchJson } = require('../lib/functions'); // Ensure the path is correct
const axios = require('axios');
const mimeTypes = require('mime-types');

const apilink = 'https://api.giftedtech.my.id/api/download/dlmp3?apikey=gifted&url='; // Updated API LINK

cmd({
    pattern: "ytmp3",
    alias: ["ytmp3dl", "ytmp4"],
    react: "🎥",
    desc: "Download YouTube videos or audio",
    category: "download",
    use: '.ytdl <YouTube URL>',
    filename: __filename
}, async (conn, mek, m, { from, quoted, reply, q }) => {
    try {
        if (!q) {
            return await reply("⚠️ Please provide a YouTube video URL!");
        }

        // Validate YouTube URL (basic check)
        const isValidUrl = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(q);
        if (!isValidUrl) {
            return await reply("⚠️ Please provide a valid YouTube video URL!");
        }

        const ytdl_info = await fetchJson(`${apilink}${encodeURIComponent(q)}`);

        // Check if the API response is successful
        if (!ytdl_info.success) {
            return await reply("🚫 No results found or an error occurred!");
        }

        const audioInfo = ytdl_info.result;

        // Prepare the message
        const msg = `
            *YouTube Downloader* 🎥

            • *Title* - ${audioInfo.title}
            • *Quality* - ${audioInfo.quality}
            • *Download Link (MP3)* - [Click Here](${audioInfo.download_url})

            *© Projects of Didula Rashmika*`;

        // Sending the message with details
        await conn.sendMessage(from, {
            text: msg,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: `YouTube Downloader`,
                    body: `Download your favorite YouTube videos easily!`,
                    thumbnailUrl: audioInfo.thumbail,
                    sourceUrl: q,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: mek });

        // Downloading the MP3 file
        const res = await axios.get(audioInfo.download_url, { 
            responseType: 'arraybuffer',
            timeout: 15000 // Set a timeout of 15 seconds
        });

        // Get MIME type and extension
        const mime = res.headers['content-type'] || 'application/octet-stream';
        const extension = mimeTypes.extension(mime) || 'unknown';

        // Get file size from headers
        const fileSize = parseInt(res.headers['content-length']) || 0;
        const maxFileSize = 10 * 1024 * 1024; // 10 MB

        if (fileSize > maxFileSize) {
            return reply('❗ File is too large to upload (limit: 10MB).');
        }

        // Define file name
        const fileName = `${audioInfo.title}.mp3`; // Change file name to audio title

        // Send the file as a document
        await conn.sendMessage(
            from,
            {
                document: { url: audioInfo.download_url },
                caption: `Here is your downloaded file: ${audioInfo.title}`,
                mimetype: mime,
                fileName: fileName
            },
            { quoted: mek }
        );

    } catch (error) {
        // Handle errors gracefully
        console.error(error);
        reply(`❌ Error: ${error.response ? error.response.data : error.message}`);
    }
});

