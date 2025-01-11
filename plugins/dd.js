
const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');
const axios = require('axios');
const mimeTypes = require('mime-types');

cmd({
    pattern: "dlfilm",
    react: "🎬",
    alias: ["dlmovie", "downloadfilm"],
    desc: "Film downloader",
    category: "download",
    use: '.dlfilm <link>',
    filename: __filename
},
async (conn, mek, m, { 
    from, quoted, body, args, q, reply 
}) => {
    try {
        if (!q) return reply('❗ Please provide a film link!');

        // Validate URL format
        const isValidUrl = (url) => {
            try {
                new URL(url);
                return true;
            } catch {
                return false;
            }
        };

        if (!isValidUrl(q)) return reply('❌ Invalid URL format! Please check the link.');

        // Fetch the file data from the provided link
        const res = await axios.get(q, { 
            responseType: 'arraybuffer',
            timeout: 10000, // Set a timeout of 10 seconds
            maxRedirects: 5 // Allows for multiple redirects
        });

        // Get MIME type and extension
        const mime = res.headers['content-type'] || 'application/octet-stream';
        const extension = mimeTypes.extension(mime) || 'unknown';

        // Check if the file is a video format
        const videoMimeTypes = ['video/mp4', 'video/x-msvideo', 'video/x-matroska', 'video/quicktime'];
        if (!videoMimeTypes.includes(mime)) {
            return reply('❌ The provided link does not appear to be a video file.');
        }

        // Get file size from headers
        const fileSize = res.headers['content-length'] || 0;
        const maxFileSize = 2048 * 2048 * 2048; // 2 GB limit

        if (fileSize > maxFileSize) {
            return reply('❗ File is too large to upload (limit: 2GB).');
        }

        // Define file name
        const fileName = `Downloaded_Film_${Date.now()}.${extension}`;

        // Send the file as a document
        await conn.sendMessage(
            from,
            {
                document: { url: q },
                caption: `> Film Downloaded 🎬\nFilename: ${fileName}\n> 🔱 𝐏𝐫𝐨𝐣𝐞𝐜𝐭𝐬 𝐎𝐟 𝐃𝐢𝐝𝐮𝐥𝐚 𝐑𝐚𝐬𝐡𝐦𝐢𝐤𝐚 💀🙌`, // Updated caption to include filename
                mimetype: mime,
                fileName: fileName
            },
            { quoted: mek }
        );

    } catch (error) {
        // Handle errors gracefully
        console.error(error);
        reply(`❌ Error: ${error.message}`);
    }
});