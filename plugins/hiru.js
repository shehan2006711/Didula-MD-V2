
const { cmd } = require('../command'); // Adjust based on your command handling system
const axios = require("axios");
const nexara = require("@dark-yasiya/nexara");
require("dotenv").config();
const CREATOR = "Dark Yasiya";

// Function to fetch the latest local news from Hirunews
async function hirunewsLocalList() {
    try {
        const $ = await nexara("https://www.hirunews.lk/local-news.php?pageID=1");
        const news = [];

        // Update selectors to fetch the correct local news items
        $("div.card").each((i, el) => {
            const title = $(el).find("h5.card-title > a").text().trim();
            const desc = $(el).find("p.card-text").text().trim();
            const date = $(el).find("small.text-muted").text().trim();
            const urls = $(el).find("h5.card-title > a").attr("href");
            const url = "https://www.hirunews.lk" + urls;
            const image = $(el).find("img.card-img-top").attr("src");

            // Check if any required data is missing before pushing
            if (title && url) {
                news.push({ title, image, date, url, desc });
            }
        });

        if (news.length === 0) {
            throw new Error("No Local News found.");
        }

        return { data: news };
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching local news: " + error.message);
    }
}

// Command to handle the Hirunews local news request
cmd({
    pattern: "hirulocal",
    alias: ["hirulocalnews"],
    desc: "Get the latest local news from Hirunews.",
    category: "News",
    react: "📰",
    use: '.hirulocal',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        reply("Fetching the latest local news from Hirunews...");

        const list = await hirunewsLocalList();
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
