
const { cmd } = require('../command');
const { fetchJson, reply } = require('../lib/functions'); // Ensure the path is correct
const axios = require('axios');

// API Configuration
const searchApiLink = 'https://www.dark-yasiya-api.site/search/phub?q=';
const downloadApiLink = 'https://www.dark-yasiya-api.site/download/phub?url=';

// Command Registration
cmd({
    pattern: "phub",
    alias: ["pornhub"],
    use: '.phub search_term',
    react: "🍑",
    desc: "Search and download videos from Pornhub.",
    category: "download",
    filename: __filename
}, 

async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply('*Please provide a search term!*');

        // Search for videos on Pornhub
        const searchResponse = await fetchJson(`${searchApiLink}${encodeURIComponent(q)}`);
        if (searchResponse.result.length === 0) {
            return reply("🚫 No results found!");
        }

        // Get the first result
        const video = searchResponse.result[0];
        const downloadResponse = await fetchJson(`${downloadApiLink}${encodeURIComponent(video.url)}`);

        // Check if the download response is successful
        if (downloadResponse.code !== 0) {
            return await reply("🚫 Error occurred while fetching video information!");
        }

        const videoInfo = downloadResponse;

        // Prepare the message
        const msg = `
            *Pornhub Video Downloader* 🍑

            • *Title* - ${videoInfo.video_title}\n
            • *Uploader* - ${videoInfo.video_uploader}\n
            • *Upload Date* - ${videoInfo.video_upload_date}\n
            • *Download Links:*

            240p: ${videoInfo.format[0].download_url}
            480p: ${videoInfo.format[1].download_url}
            720p: ${videoInfo.format[2].download_url}
            1080p: ${videoInfo.format[3].download_url}
        `;

        // Send the message with video details
        await conn.sendMessage(from, {
            text: msg,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: `Pornhub Video Downloader`,
                    body: `Download your favorite Pornhub videos easily!`,
                    thumbnailUrl: video.image,
                    sourceUrl: video.url,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: mek });

    } catch (error) {
        // Handle errors gracefully
        console.error(error);
        reply(`❌ Error: ${error.response ? error.response.data : error.message}`);
    }
});