
// search.js - All Search Category Commands

const { cmd, commands } = require('../command');
const config = require('../config');
const axios = require('axios');
const g_i_s = require('g-i-s');
const cheerio = require('cheerio');
const yts = require('yt-search'); // Make sure to import the yts library


cmd({
    pattern: "ipinfo",
    desc: "Get information about an IP address",
    use: ".ipinfo <IP_address>",
    category: "search",
    filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
    try {
        if (!q) return reply("⛔ Please provide an IP address!");

        const apiUrl = `https://BJ-Devs.serv00.net/Ip-Info.php?ip=${q}`;

        const response = await axios.get(apiUrl);
        const data = response.data;

        // Format the response message
        let resultMessage = `🔍 *IP Information:*\n\n`;
        resultMessage += `🌐 IP: ${data.ip}\n`;
        resultMessage += `🌍 Continent: ${data.continent_name} (${data.continent_code})\n`;
        resultMessage += `🇨🇳 Country: ${data.country_name} (${data.country_code2})\n`;
        resultMessage += `🏙️ City: ${data.city}\n`;
        resultMessage += `📍 State/Province: ${data.state_prov}\n`;
        resultMessage += `📮 Zip Code: ${data.zipcode}\n`;
        resultMessage += `📏 Latitude: ${data.latitude}\n`;
        resultMessage += `📏 Longitude: ${data.longitude}\n`;
        resultMessage += `📞 Calling Code: ${data.calling_code}\n`;
        resultMessage += `🕒 Time Zone: ${data.time_zone.name}\n`;
        resultMessage += `💻 ISP: ${data.isp}\n`;
        resultMessage += `🏳️ Country Flag: ${data.country_flag}\n`;

        // Send the response back
        reply(resultMessage);
    } catch (error) {
        console.error(error);
        if (error.response && error.response.data) {
            reply(`Error: ${error.response.data.message}`);
        } else {
            reply('An error occurred while fetching IP information. Please try again later.');
        }
    }
});







cmd({
    pattern: "yts",
    desc: "Search YouTube videos",
    use: ".yts <query>",
    category: "search",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply('⛔ Please provide a search query!');
        
        const searchResults = await yts(q);
        const videos = searchResults.videos.slice(0, 5); // Get the top 5 results
        
        if (videos.length === 0) {
            return reply('No results found.');
        }
        
        let resultMessage = '🎥 *YouTube Search Results:*\n\n';
        videos.forEach((video, index) => {
            resultMessage += `${index + 1}. [${video.title}](${video.url}) - ${video.author.name}\n`;
        });
        
        reply(resultMessage);
    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
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
},
async(conn, mek, m, { from, reply, q }) => {
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

// Web Search Function (if needed)
cmd({
    pattern: "search",
    alias: ["websearch"],
    react: "🌐",
    desc: "Search the web for information",
    category: "search",
    use: '.search <query>',
    filename: __filename
},
async(conn, mek, m, { from, reply, q }) => {
    try {
        if (!q) return await reply("Please provide a search query!");

        // Using the search_web function
        const searchResults = await search_web(q);
        await reply(searchResults);

    } catch (error) {
        console.error(error);
        reply('An error occurred while searching. Please try again later.');
    }
});


// Group JIDs Search

// Get Profile Picture Command
cmd({
    pattern: "getpic",
    desc: "Get the group profile picture.",
    category: "search",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in a group.')

        const groupPic = await conn.getProfilePicture(from)
        await conn.sendMessage(from, { 
            image: { url: groupPic }, 
            caption: 'Group Profile Picture' 
        })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
});


// View Once Message Search
cmd({
    pattern: "vv",
    react: "👀",
    alias: ["rvo"],
    dontAddCommandList: true,
    category: "search",
    use: '.vv',
    filename: __filename
},
async(conn, mek, m, {from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try {
        const quot = m.msg.contextInfo.quotedMessage.viewOnceMessageV2;
        if(quot) {
            if(quot.message.imageMessage) {
                console.log("Quot Entered") 
                let cap = quot.message.imageMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(quot.message.imageMessage)
                return conn.sendMessage(m.chat,{image:{url : anu},caption : cap })
            }
            if(quot.message.videoMessage) {
                let cap = quot.message.videoMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(quot.message.videoMessage)
                return conn.sendMessage(m.chat,{video:{url : anu},caption : cap })
            }
        }

        if(!m.quoted) return m.reply("```Uh Please Reply A ViewOnce Message```")           
        if(m.quoted.mtype === "viewOnceMessage") {
            console.log("ViewOnce Entered") 
            if(m.quoted.message.imageMessage) {
                let cap = m.quoted.message.imageMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(m.quoted.message.imageMessage)
                conn.sendMessage(m.chat,{image:{url : anu},caption : cap })
            }
            else if(m.quoted.message.videoMessage) {
                let cap = m.quoted.message.videoMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(m.quoted.message.videoMessage)
                conn.sendMessage(m.chat,{video:{url : anu},caption : cap })
            }
        }
        else return m.reply("```This is Not A ViewOnce Message```")
    } catch(e) {  
        console.log("error" , e) 
    }     
});

module.exports = {
    // Export any necessary functions or variables
};