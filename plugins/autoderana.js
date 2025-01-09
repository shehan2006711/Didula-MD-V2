
const { cmd } = require('../command');
const nexara = require("@dark-yasiya/nexara");
require("dotenv").config();

let activeGroups = {};
let lastNewsTitles = { derana: {} };

// Function to fetch the latest news from Derana
async function getDeranaNews() {
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

        return news;
    } catch (error) {
        console.error(`Error fetching Derana news: ${error.message}`);
        return null;
    }
}

// Function to send news to a group
async function sendNews(conn, groupId, news) {
    if (news) {
        // Check if the title is different before sending
        if (lastNewsTitles.derana[groupId] !== news.title) {
            lastNewsTitles.derana[groupId] = news.title; // Update the last news title sent to the group
            
            // Constructing the message
            let message = `📰 *Derana News*\n\n*Title:* ${news.title}\n\n*Description:* ${news.desc}\n\n*Published On:* ${news.date}`;
            if (news.url) message += `\n\n*Read more:* ${news.url}`;
            message += `\n\n> *©🔱 𝐏𝐫𝐨𝐣𝐞𝐜𝐭𝐬 𝐎𝐟 𝐃𝐢𝐝𝐮𝐥𝐚 𝐑𝐚𝐬𝐡𝐦𝐢𝐤𝐚 💀🙌*`; // Add caption

            // Check if there is an image to send
            if (news.image) {
                await conn.sendMessage(groupId, {
                    image: { url: news.image },
                    caption: message
                });
            } else {
                await conn.sendMessage(groupId, { text: message });
            }
        }
    }
}

// Function to check and post the latest news
async function checkAndPostNews(conn, groupId) {
    const deranaNews = await getDeranaNews();

    // Send Derana News
    if (deranaNews) {
        await sendNews(conn, groupId, deranaNews[0]); // Send the first news item
    }
}

// Command to activate 24/7 news service in a group
cmd({
    pattern: "startnews",
    desc: "Enable Derana news updates in this group",
    isGroup: true,
    react: "📰",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, participants }) => {
    try {
        const isAdmin = participants.some(p => p.id === mek.sender && p.admin);
        const isBotOwner = mek.sender === conn.user.jid;

        if (isAdmin || isBotOwner) {
            if (!activeGroups[from]) {
                activeGroups[from] = true;
                await conn.sendMessage(from, { text: "📰 24/7 Derana News Activated." });

                // Start the interval if it's not already active
                if (!activeGroups['interval']) {
                    activeGroups['interval'] = setInterval(async () => {
                        for (const groupId in activeGroups) {
                            if (activeGroups[groupId] && groupId !== 'interval') {
                                await checkAndPostNews(conn, groupId);
                            }
                        }
                    }, 60000); // Run every 60 seconds
                }
            } else {
                await conn.sendMessage(from, { text: "📰 24/7 Derana News Already Activated." });
            }
        } else {
            await conn.sendMessage(from, { text: "🚫 This command can only be used by group admins or the bot owner." });
        }
    } catch (e) {
        console.error(`Error in startnews command: ${e.message}`);
        await conn.sendMessage(from, { text: "Failed to activate the news service." });
    }
});

// Command to deactivate the 24/7 news service
cmd({
    pattern: "stopnews",
    desc: "Disable Derana news updates in this group",
    isGroup: true,
    react: "🛑",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, participants }) => {
    try {
        const isAdmin = participants.some(p => p.id === mek.sender && p.admin);
        const isBotOwner = mek.sender === conn.user.jid;

        if (isAdmin || isBotOwner) {
            if (activeGroups[from]) {
                delete activeGroups[from];
                await conn.sendMessage(from, { text: "🛑 24/7 Derana News Deactivated." });

                // Stop the interval if no groups are active
                if (Object.keys(activeGroups).length === 1 && activeGroups['interval']) {
                    clearInterval(activeGroups['interval']);
                    delete activeGroups['interval'];
                }
            } else {
                await conn.sendMessage(from, { text: "🛑 24/7 Derana News is not active in this group." });
            }
        } else {
            await conn.sendMessage(from, { text: "🚫 This command can only be used by group admins or the bot owner." });
        }
    } catch (e) {
        console.error(`Error in stopnews command: ${e.message}`);
        await conn.sendMessage(from, { text: "Failed to deactivate the news service." });
    }
});

// Command to check if the news service is active
cmd({
    pattern: "checknews",
    desc: "Check if the Derana news service is active in this group",
    isGroup: true,
    react: "🔍",
    filename: __filename
}, async (conn, mek, m, { from }) => {
    if (activeGroups[from]) {
        await conn.sendMessage(from, { text: "📰 The 24/7 Derana news service is currently active in this group." });
    } else {
        await conn.sendMessage(from, { text: "🛑 The 24/7 Derana news service is not active in this group." });
    }
});