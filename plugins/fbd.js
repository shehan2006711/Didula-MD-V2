const { cmd } = require('../command');
const { download } = require('facebook-video-downloader');
const fs = require('fs');
const axios = require('axios');

cmd({
    pattern: "downloadfb",
    desc: "Download a video from Facebook",
    category: "download",
    react: "✅",
    filename: __filename
}, async (conn, mek, m, { from, quoted, reply }) => {
    try {
        const fbUrl = m.text.split(" ")[1];

        if (!fbUrl) {
            return reply("Please provide a valid Facebook video URL.");
        }

        download(fbUrl, async (error, data) => {
            if (error) {
                return reply("Error fetching video information. Please check the URL.");
            }

            const videoUrl = data.bestQuality.url;
            console.log("Video URL:", videoUrl);

            const response = await axios.get(videoUrl, { responseType: 'stream' });

            const fileName = fbUrl.split('/').pop() + '.mp4';
            const filePath = `./downloads/${fileName}`;

            const writer = fs.createWriteStream(filePath);
            response.data.pipe(writer);

            writer.on('finish', () => {
                console.log("Video downloaded successfully.");
                conn.sendMessage(from, {
                    video: { url: filePath },
                    mimetype: "video/mp4",
                    fileName: fileName
                });
                fs.unlinkSync(filePath);
            });

            writer.on('error', (err) => {
                console.error("Error saving video:", err);
                reply("Error downloading the video.");
            });
        });
    } catch (error) {
        console.error("An error occurred:", error);
        reply(`An error occurred while downloading the video: ${error.message}`);
    }
});
