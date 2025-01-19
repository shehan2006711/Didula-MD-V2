
const { cmd } = require('../command'); // Ensure the path is correct
const g_i_s = require('g-i-s'); // Import g-i-s for image search
const axios = require('axios'); // Import axios for HTTP requests

// Google Image Search Command
cmd({
    pattern: "img",
    alias: ["googleimg"],
    react: "🔍",
    desc: "Search for images on Google",
    category: "search",
    use: '.img <query>',
    filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
    try {
        if (!q) return await reply("Please provide a search query!");

        g_i_s(q, (error, result) => {
            if (error || !result.length) return reply("No images found!");

            // Send the first 5 images
            const imageUrls = result.slice(0, 5).map(img => img.url);
            imageUrls.forEach(async (url) => {
                await conn.sendMessage(from, { image: { url } }, { quoted: mek });
            });
        });

    } catch (error) {
        console.error(error);
        reply('An error occurred while processing your request. Please try again later.');
    }
});

// YouTube Search Command
cmd({
    pattern: "ytsearch",
    alias: ["youtube"],
    react: "📹",
    desc: "Search for videos on YouTube",
    category: "search",
    use: '.ytsearch <query>',
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("Please provide a search query!");

        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(q)}&key=YOUR_YOUTUBE_API_KEY`; // Replace with your YouTube API Key
        const response = await axios.get(searchUrl);
        const results = response.data.items;

        if (!results.length) return reply("No videos found!");

        let replyMessage = "*YouTube Search Results:*\n\n";
        results.forEach((video, index) => {
            replyMessage += `${index + 1}. [${video.snippet.title}](https://www.youtube.com/watch?v=${video.id.videoId})\n`;
        });

        await conn.sendMessage(from, { text: replyMessage }, { quoted: mek });
    } catch (error) {
        console.error(error);
        reply('An error occurred while searching YouTube. Please try again later.');
    }
});

// Wikipedia Search Command
cmd({
    pattern: "wiki",
    desc: "Search for articles on Wikipedia",
    category: "search",
    use: '.wiki <query>',
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("Please provide a search query!");

        const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&format=json`;
        const response = await axios.get(wikiUrl);
        const results = response.data.query.search;

        if (!results.length) return reply("No articles found!");

        let replyMessage = "*Wikipedia Search Results:*\n\n";
        results.forEach((article, index) => {
            replyMessage += `${index + 1}. [${article.title}](https://en.wikipedia.org/wiki/${encodeURIComponent(article.title)})\n`;
        });

        await conn.sendMessage(from, { text: replyMessage }, { quoted: mek });
    } catch (error) {
        console.error(error);
        reply('An error occurred while searching Wikipedia. Please try again later.');
    }
});

// Add more search commands here...
