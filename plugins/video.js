
const { cmd } = require('../command'); // Ensure the path is correct
const { fetchJson, getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep } = require('../lib/functions'); // Ensure the path is correct
const axios = require('axios');
const mimeTypes = require('mime-types');
const ytdl = require('yt-search');
const fs = require('fs-extra');

// API Configuration
const apilink = 'https://api.giftedtech.my.id/api/download/dlmp4?apikey=gifted&url='; // Updated API LINK for video
const l = console.log; // Logger
var videotime = 60000; // 1000 min (consider changing the variable name if necessary)

// Command Registration
cmd({
    pattern: "video2",
    alias: ["ytvideo"],
    use: '.video sameer kutti',
    react: "🎥",
    desc: "Search and get details from YouTube.",
    category: "download",
    filename: __filename
},

async(conn, mek, m, { from, l, quoted, body, isCmd, umarmd, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply('*Please give me words to search*');

        let yts = require("yt-search");
        let arama = await yts(q);

        // Check if any results are found
        if (arama.all.length === 0) {
            return await reply("🚫 No results found!");
        }

        // Get the first video result
        const video = arama.all[0]; 
        const ytdl_info = await fetchJson(`${apilink}${video.url}`); // Use video.url instead of video.title

        // Check if the API response is successful
        if (!ytdl_info.success) {
            return await reply("🚫 No results found or an error occurred!");
        }

        const videoInfo = ytdl_info.result;

        // Prepare the message
        const msg = `
            *Didula MD V2 💚 YouTube Video Downloader* 🎥

            • *Title* - ${videoInfo.title}\n
            • *Quality* - ${videoInfo.quality}\n
            • *Download Link (MP4)* - (${videoInfo.download_url})

            *© Projects of Didula Rashmika*`;

        // Sending the message with details
        await conn.sendMessage(from, {
            text: msg,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: `YouTube Video Downloader`,
                    body: `Download your favorite YouTube videos easily!`,
                    thumbnailUrl: videoInfo.thumbnail, // Corrected 'thumbail' to 'thumbnail'
                    sourceUrl: q,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: mek });

        // Downloading the MP4 file
        const res = await axios.get(videoInfo.download_url, { 
            responseType: 'arraybuffer',
            timeout: 15000 // Set a timeout of 15 seconds
        });

        // Get MIME type and extension
        const mime = res.headers['content-type'] || 'application/octet-stream';
        const extension = mimeTypes.extension(mime) || 'unknown';

        // Get file size from headers
        const fileSize = parseInt(res.headers['content-length']) || 0;
        const maxFileSize = 50 * 1024 * 1024; // 50 MB for video

        if (fileSize > maxFileSize) {
            return reply('❗ File is too large to upload (limit: 50MB).');
        }

        // Define file name
        const fileName = `Didula MD V2 💚 ${videoInfo.title}.mp4`; 

        // Send the file as a document
        await conn.sendMessage(
            from,
            {
                document: { url: videoInfo.download_url },
                caption: `Here is your downloaded file: ${videoInfo.title}`,
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