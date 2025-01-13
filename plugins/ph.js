
const { cmd } = require('../command'); // Ensure the path is correct
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

cmd({
    pattern: "ph",
    alias: ["dlphquery", "phdlquery"],
    react: '🍑',
    desc: "Search and download Pornhub videos",
    category: "nsfw",
    use: '.phsearch <query>',
    filename: __filename
}, async (conn, mek, m, { from, q }) => {
    try {
        if (!q) return reply('*Please provide a search query!*');

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`https://www.pornhub.com/search?search=${encodeURIComponent(q)}`);

        const content = await page.content();
        const $ = cheerio.load(content);

        // Extract the first video's link from search results
        const firstVideo = $('.videoWrapper a').first();
        if (!firstVideo.length) return reply("No results found!");

        const videoUrl = firstVideo.attr('href');
        await page.goto(videoUrl);
        const videoContent = await page.content();

        // Extract video details
        const videoPage = cheerio.load(videoContent);
        const title = videoPage('h1.title').text();
        const views = videoPage('span.views').text();
        const likes = videoPage('span.likes').text();
        const dislikes = videoPage('span.dislikes').text();
        const videoSource = videoPage('video source').attr('src');
        const thumbnail = videoPage('meta[property="og:image"]').attr('content');

        const msg = `
            🍑 *PORNHUB DOWNLOADER* 🍑
            • *Title* - ${title}
            • *Views* - ${views}
            • *Likes* - ${likes}
            • *Dislikes* - ${dislikes}
        `;

        await conn.sendMessage(from, { image: { url: thumbnail || '' }, caption: msg }, { quoted: mek });
        await conn.sendMessage(from, { video: { url: videoSource }, caption: title }, { quoted: mek });

        await browser.close();
    } catch (e) {
        reply('*Error occurred!*');
        console.log(e);
    }
});
