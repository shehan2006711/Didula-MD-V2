const { cmd } = require('../command'); // Adjust based on your command handling system
const axios = require("axios");
const nexara = require("@dark-yasiya/nexara");
require("dotenv").config();
const CREATOR = "Dark Yasiya";

// Function to fetch the latest news from Derana
async function deranaNewsList() {
    try {
        const $ = await nexara("https://sinhala.adaderana.lk/sinhala-hot-news.php");
        const news = [];

        $("body > main > div > div > div.col-xs-12.col-sm-8.col-lg-7 > div").each((i, el) => {
            const title = $(el).find("div.story-text > h2 > a").text();
            const desc = $(el).find("div.story-text > p").text();
            const date = $(el).find("div.story-text > div.comments > span").text().trim();
            const urls = $(el).find("div.story-text > div.thumb-image > a").attr("href");
            const url = "https://sinhala.adaderana.lk/" + urls;
            const image = $(el).find("div.story-text > div.thumb-image > a > img").attr("src");
            news.push({ title, image, date, url, desc });
        });

        if (news.length === 0) {
            throw new Error("No News found.");
        }

        return { data: news };
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching news: " + error.message);
    }
}

// Command to handle the Derana news request
cmd({
    pattern: "derana",
    alias: ["derananews"],
    desc: "Get the latest Derana news.",
    category: "News",
    react: "📰",
    use: '.derana',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        reply("Fetching the latest Derana news...");

        const list = await deranaNewsList();
        const latestNews = list.data[0]; // Get the first news item

        const newsMessage = `
            📰 *${latestNews.title}*
            *📅 Date:* ${latestNews.date}
            *✏️ Description:* ${latestNews.desc}
            🔗 [Read More](${latestNews.url})
        `;

        await conn.sendMessage(from, { image: { url: latestNews.image }, caption: newsMessage });
    } catch (error) {
        console.error(error);
        reply(`An error occurred: ${error.message}`);
    }
});