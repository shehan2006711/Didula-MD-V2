
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
    let browser;
    try {
        if (!q) return conn.sendMessage(from, { text: '*Please provide a search query!*' }, { quoted: mek });

        browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`https://www.pornhub.com/search?search=${encodeURIComponent(q)}`, { waitUntil: 'domcontentloaded' });

        const content = await page.content();
        const $ = cheerio.load(content);

        // Extract the first video's link from search results
        const firstVideo = $('.videoWrapper a').first();
        if (!firstVideo.length) return conn.sendMessage(from, { text: "No results found!" }, { quoted: mek });

        const videoUrl = firstVideo.attr('href');
        await page.goto(videoUrl, { waitUntil: 'domcontentloaded' });
        const videoContent = await page.content();

        // Extract video details
        const videoPage = cheerio.load(videoContent);
        const title = videoPage('h1.title').text().trim();
        const views = videoPage('span.views').text().trim();
        const likes = videoPage('span.likes').text().trim();
        const dislikes = videoPage('span.dislikes').text().trim();
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
        if (videoSource) {
            await conn.sendMessage(from, { video: { url: videoSource }, caption: title }, { quoted: mek });
        } else {
            await conn.sendMessage(from, { text: '*Video source not found!*' }, { quoted: mek });
        }

    } catch (e) {
        console.error(e);
        conn.sendMessage(from, { text: '*An error occurred while processing your request. Please try again later.*' }, { quoted: mek });
    } finally {
        if (browser) {
            await browser.close();
        }
    }
});