
const { cmd, commands } = require('../command');
const axios = require('axios');
const scraper = require("../lib/scraperd");
const { fetchJson, getBuffer, getRandom } = require('../lib/functions');
const g_i_s = require('g-i-s');
const cheerio = require('cheerio');
const config = require('../config');

const apilink1 = 'https://api.fgmods.xyz/api/img/couple?apikey=nRHt2lt5'; // Couple image API

// Ping Command
cmd({
    pattern: "ping",
    alias: ["pong"],
    react: "🏓",
    desc: "Check the bot's responsiveness",
    category: "utility",
    use: '.ping',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    const vajiralod = ["Checking speed..."];
    const start = Date.now();
    await reply("Pinging...");
    const end = Date.now();
    const latency = end - start;
    await reply(`Speed: ${latency} ms`);
});

// All Menu Command
cmd({
    pattern: "allmenu",
    alias: ["list"],
    react: "📜",
    desc: "Get a comprehensive command list categorized",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from }) => {
    try {
        const categories = ['download', 'main', 'group', 'owner', 'convert', 'search'];
        let allMenu = '';
        
        categories.forEach(category => {
            let menu = commands.filter(cmd => cmd.category === category && !cmd.dontAddCommandList)
                .map(cmd => `*📍➣ Command :* ${cmd.pattern}\n*📃➣ Desc :* ${cmd.desc}\n*⌛➣ Use:* ${cmd.use}\n\n`).join('');
            if (menu) {
                allMenu += `💚 *${category.charAt(0).toUpperCase() + category.slice(1)} Menu:📥*\n\n${menu}────────────────────\n\n`;
            }
        });

        if (!allMenu) allMenu = 'No commands available in any category.';
        await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: allMenu }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`An error occurred: ${e.message}`);
    }
});

// Anime Girl Command (Consolidated)
cmd({
    pattern: "animegirl",
    desc: "Fetch a random anime girl image.",
    category: "other",
    react: "👧",
    filename: __filename
}, async (conn, mek, m, { from }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '*Didula MD V2 💚*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});

// Couple Picture Command
cmd({
    pattern: "couplepp",
    alias: ["couplepic"],
    react: "💑",
    desc: "Get a couple image",
    category: "other",
    use: '.couple',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const coupleData = await fetchJson(apilink1);
        if (!coupleData.status) return await reply("Failed to fetch couple image!");

        const msg = `*Didula MD V2 💚 Couple Image* 💑\n\n• *Boy* - ${coupleData.result.boy}\n• *Girl* - ${coupleData.result.girl}\n\nDidula MD V2💚`;

        await conn.sendMessage(from, { text: msg });
        await conn.sendMessage(from, { image: { url: coupleData.result.boy }, caption: "Didula MD V2 💚 - Boy" }, { quoted: mek });
        await conn.sendMessage(from, { image: { url: coupleData.result.girl }, caption: "Didula MD V2 💚 - Girl" }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply('An error occurred while processing your request. Please try again later.');
    }
});

// Image Search Command
cmd({
    pattern: "img",
    alias: ["googleimg"],
    react: "🔍",
    desc: "Search for images on Google",
    category: "search",
    use: '.imgsearch <query>',
    filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
    try {
        if (!q) return await reply("Please provide a search query!");

        g_i_s(q, (error, result) => {
            if (error || !result.length) return reply("No images found!");

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

// Additional Commands...

