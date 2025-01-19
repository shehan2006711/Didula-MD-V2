
// search.js - All Search Category Commands

const { cmd } = require('../command');
const config = require('../config');
const axios = require('axios');
const g_i_s = require('g-i-s');
const cheerio = require('cheerio');

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

// Wallpaper Search Command
cmd({
    pattern: "wallpaper",
    alias: ["wallpaperdownload"],
    react: "🖼️",
    desc: "Download a random wallpaper",
    category: "search",
    use: '.downloadwallpaper',
    filename: __filename
},
async(conn, mek, m, { from, reply }) => {
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
            return await reply("No wallpapers found!");
        }

        // Randomly select an image from the results
        const selectedImage = results[Math.floor(Math.random() * results.length)];

        // Send the selected image directly
        await conn.sendMessage(from, { 
            image: { url: selectedImage }, 
            caption: "Here is your wallpaper!" 
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply('An error occurred while downloading the wallpaper. Please try again later.');
    }
});

// System Information Search
cmd({
    pattern: "sysinfo",
    alias: ["system"],
    react: "🖥️",
    desc: "Get system information",
    category: "search",
    use: '.sysinfo',
    filename: __filename
},
async(conn, mek, m, { from, reply }) => {
    try {
        const si = require('systeminformation');
        const data = await si.getAllData();
        const msg = `
            *Didula MD V2 💚 System Information:*
            • CPU: ${data.cpu.manufacturer} ${data.cpu.brand}
            • Cores: ${data.cpu.cores}
            • RAM: ${(data.mem.total / 1e9).toFixed(2)} GB
            • OS: ${data.os.distro} ${data.os.release}
        `;
        await reply(msg);

    } catch (error) {
        console.error(error);
        reply('An error occurred while fetching system information. Please try again later.');
    }
});

// Group JIDs Search
cmd({
    pattern: "gjid",
    desc: "Get the list of JIDs for all groups the bot is part of.",
    category: "search",
    react: "📝",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    const groups = await conn.groupFetchAllParticipating();
    const groupJids = Object.keys(groups).join('\n');
    reply(`📝 *Group JIDs:*\n\n${groupJids}`);
});

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

// JID Information Command
cmd({
    pattern: "jid",
    react: "💻",
    alias: ["jids"],
    desc: "Check bot's ping",
    category: "search",
    use: '.ping',
    filename: __filename
},
async(conn, mek, m, {from, mnu, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try {
        reply(from)
    } catch (e) {
        reply(`${e}`)
        console.log(e)
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