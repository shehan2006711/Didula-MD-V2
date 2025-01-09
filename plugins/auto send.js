
const { cmd } = require('../command'); // Ensure the path is correct
const axios = require('axios'); // Import axios for HTTP requests
const cheerio = require('cheerio'); // Import cheerio for HTML parsing

const groupChatId = '120363369263911239@g.us'; // ID of the target group chat

async function sendRandomWallpaper(conn) {
    try {
        const searchUrl = 'https://unsplash.com/s/photos/wallpaper';
        const { data } = await axios.get(searchUrl);
        const $ = cheerio.load(data);

        const results = [];
        $('figure img').each((index, element) => {
            const imgUrl = $(element).attr('src');
            results.push(imgUrl);
        });

        if (results.length === 0) {
            console.log("No wallpapers found!");
            return;
        }

        // Randomly select an image from the results
        const selectedImage = results[Math.floor(Math.random() * results.length)];

        // Send the selected image directly to the group
        await conn.sendMessage(groupChatId, { image: { url: selectedImage }, caption: "Here is your wallpaper!" });

    } catch (error) {
        console.error(error);
    }
}

// Send a wallpaper every 5 minutes (30000 milliseconds)
setInterval(() => {
    sendRandomWallpaper(conn); // Ensure `conn` is accessible in this scope
}, 30);

// Command to start the automated wallpaper sending
cmd({
    pattern: "start",
    desc: "Start sending wallpapers every 5 minutes",
    category: "download",
    filename: __filename
}, async (conn, mek) => {
    await conn.reply(mek.from, "Automatic wallpaper sending has started!", mek);
    sendRandomWallpaper(conn); // Send an initial wallpaper immediately
});
