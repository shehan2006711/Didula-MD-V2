
const { cmd } = require('../command'); // Ensure the path is correct
const axios = require('axios'); // Import axios for HTTP requests
const cheerio = require('cheerio'); // Import cheerio for HTML parsing

cmd({
    pattern: "pvideo",
    alias: ["pornvideodownload"],
    react: "🎥",
    desc: "Download a random Pornhub video",
    category: "download",
    use: '.downloadpornvideo',
    filename: __filename
},
async(conn, mek, m, { from, reply }) => {
    try {
        const searchUrl = 'https://www.pornhub.com/video';
        const { data } = await axios.get(searchUrl);
        const $ = cheerio.load(data);

        const results = [];
        $('a.videoPreview').each((index, element) => {
            const videoUrl = $(element).attr('href');
            results.push(videoUrl);
        });

        if (results.length === 0) {
            return await reply("No videos found!");
        }

        // Randomly select a video from the results
        const selectedVideo = results[Math.floor(Math.random() * results.length)];

        // Send the selected video link directly
        await conn.sendMessage(from, { text: `Here is your video: https://www.pornhub.com${selectedVideo}` }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply('An error occurred while downloading the video. Please try again later.');
    }
});
