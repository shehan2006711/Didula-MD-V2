
const { cmd, commands } = require('../command'); // Ensure the path is correct
const axios = require('axios'); // Import axios for HTTP requests
const scraper = require("../lib/scraperd");
const fetch = require('node-fetch');
const { fetchJson, getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, jsonformat } = require('../lib/functions');
const { default: makeWASocket, useMultiFileAuthState, WA_DEFAULT_EPHEMERAL, jidNormalizedUser, proto, generateWAMessageFromContent, fetchLatestBaileysVersion, makeInMemoryStore, getContentType, generateForwardMessageContent, downloadContentFromMessage, jidDecode } = require('@whiskeysockets/baileys');
const g_i_s = require('g-i-s'); // Import g-i-s for image search
const cheerio = require('cheerio'); // Import cheerio for HTML parsing
const fs = require('fs');
const path = require('path');
const os = require('os');

const apilink = 'https://api.fgmods.xyz/api/img/couple?apikey=nRHt2lt5'; // API LINK ( DO NOT CHANGE THIS!! )
const config = require('../config');


cmd({
    pattern: "ping",
    alias: ["pong"],
    react: "🏓",
    desc: "Check the bot's responsiveness",
    category: "utility",
    use: '.ping',
    filename: __filename
},
async(conn, mek, m, { from, reply }) => {
    const vajiralod = [
        "《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
        "《 ████▒▒▒▒▒▒▒▒》30%",
        "《 ███████▒▒▒▒▒》50%",
        "《 ██████████▒▒》80%",
        "《 ████████████》100%",
        "𝗖𝗵𝗲𝗰𝗸𝗶𝗻𝗴 𝗗𝗶𝗱𝘂𝗹𝗮 𝗠𝗗 𝗦𝗽𝗲𝗲𝗱 💚..."
    ];

    const start = Date.now();
     // Inform the user that the ping is in progress

    // Send initial upload message
    let { key } = await conn.sendMessage(from, { text: 'ᴜᴘʟᴏᴀᴅɪɴɡ ᴍᴏᴠɪᴇ...' });

    // Loop through the loading messages
    for (let i = 0; i < vajiralod.length; i++) {
        await conn.sendMessage(from, { text: vajiralod[i], edit: key });
        await new Promise(resolve => setTimeout(resolve, 500)); // Wait for half a second for the next message
    }

    const end = Date.now();
    const latency = end - start; // Calculate the latency
    await reply(`𝐃𝐢𝐝𝐮𝐥𝐚 𝐌𝐃 𝐒𝐩𝐞𝐞𝐝 💚: ${latency}𝐦𝐬`);
});



cmd({
    pattern: "allmenu",
    alias: ["list"],
    react: "📜",
    desc: "Get a comprehensive command list categorized",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const categories = ['download', 'main', 'group', 'owner', 'convert', 'search'];
        let allMenu = '';

        categories.forEach(category => {
            let menu = '';
            for (let i = 0; i < commands.length; i++) {
                if (commands[i].category === category && !commands[i].dontAddCommandList) {
                    menu += `*📍➣ Command :* ${commands[i].pattern}\n*📃➣ Desc :* ${commands[i].desc}\n*⌛➣ Use:* ${commands[i].use}\n\n`;
                }
            }

            if (menu) {
                allMenu += `💚 *${category.charAt(0).toUpperCase() + category.slice(1)} Menu:📥*\n\n${menu}────────────────────\n\n`;
            }
        });

        if (!allMenu) {
            allMenu = 'No commands available in any category.';
        }

        await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: allMenu }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`An error occurred: ${e.message}`);
    }
});



cmd({
    pattern: "animegirl1",
    desc: "Fetch a random anime girl image.",
    category: "other",
    react: "👧",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
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



cmd({
    pattern: "animegirl2",
    desc: "Fetch a random anime girl image.",
    category: "other",
    react: "👧",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
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




cmd({
    pattern: "animegirl3",
    desc: "Fetch a random anime girl image.",
    category: "other",
    react: "👧",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
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


cmd({
    pattern: "animegirl4",
    desc: "Fetch a random anime girl image.",
    category: "other",
    react: "👧",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
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



cmd({
    pattern: "animegirl5",
    desc: "Fetch a random anime girl image.",
    category: "other",
    react: "👧",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
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



//Apk Download
cmd({
    pattern: "apk",
    desc: "Downloads Apk",
    use: ".apk <app_name>",
    react: "📥",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, q, reply }) => {
    const appId = q.trim();
    if (!appId) return reply(`Please provide an app name`);

    reply("_Downloading " + appId + "_");

    try {
        const appInfo = await scraper.aptoideDl(appId);
        const buff = await getBuffer(appInfo.link);

        if (!buff || !appInfo.appname) {
            return await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        }

        await conn.sendMessage(
            from,
            { document: buff, caption: `*Didula MD V2 💚*`, mimetype: "application/vnd.android.package-archive", filename: `${appInfo.appname}.apk` },
            { quoted: mek }
        );

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
        reply("*_Download Success_*");
    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply(`Error: ${e.message}`);
    }
});




cmd({
    pattern: "couplepp",
    alias: ["couplepic"],
    react: "💑",
    desc: "Get a couple image",
    category: "other",
    use: '.couple',
    filename: __filename
},
async(conn, mek, m, { from, reply }) => {
    try {
        const coupleData = await fetchJson(apilink);

        if (!coupleData.status) return await reply("Failed to fetch couple image!");

        const msg = `
            *Didula MD V2 💚 Couple Image* 💑

            • *Author* - Didula Rashmika
            • *Boy* - ${coupleData.result.boy}
            • *Girl* - ${coupleData.result.girl}\n\nDidula MD V2💚
        `;

        // Sending the message with couple images
        await conn.sendMessage(from, {
            text: msg,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
            }
        });

        // Sending images of the couple
        await conn.sendMessage(from, { image: { url: coupleData.result.boy }, caption: "Didula MD V2 💚 - Boy" }, { quoted: mek });
        await conn.sendMessage(from, { image: { url: coupleData.result.girl }, caption: "Didula MD V2 💚 - Girl" }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply('An error occurred while processing your request. Please try again later.');
    }
});



cmd({
    pattern: "dl",
    react: "📥",
    alias: ["dlurl"],
    desc: "Direct link uploader",
    category: "download",
    use: '.dl <link>',
    filename: __filename
},
async (conn, mek, m, { 
    from, quoted, body, args, q, reply 
}) => {
    try {
        if (!q) return reply('❗ Please provide a link!');

        // Validate URL format
        const isValidUrl = (url) => {
            try {
                new URL(url);
                return true;
            } catch {
                return false;
            }
        };

        if (!isValidUrl(q)) return reply('❌ Invalid URL format! Please check the link.');

        // Fetch the file data from the provided link
        const axios = require('axios');
        const mimeTypes = require('mime-types');

        const res = await axios.get(q, { 
            responseType: 'arraybuffer',
            timeout: 15000 // Set a timeout of 15 seconds
        });

        // Get MIME type and extension
        const mime = res.headers['content-type'] || 'application/octet-stream';
        const extension = mimeTypes.extension(mime) || 'unknown';

        // Get file size from headers
        const fileSize = res.headers['content-length'] || 0;
        const maxFileSize = 2048 * 2048 * 2048; // 10 MB

        if (fileSize > maxFileSize) {
            return reply('❗ File is too large to upload (limit: 10MB).');
        }

        // Define file name
        const fileName = `Didula MD V2 💚.${extension}`;

        // Send the file as a document
        await conn.sendMessage(
            from,
            {
                document: { url: q },
                caption: "> Didula MD V2 💚",
                mimetype: mime,
                fileName: fileName
            },
            { quoted: mek }
        );

    } catch (error) {
        // Handle errors gracefully
        console.error(error);
        reply(`❌ Error: ${error.message}`);
    }
});





cmd({
    pattern: "mute",
    react: "�",
    desc: "close a group",
    category: "group",
    use: '.mute',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{                   
if (!isGroup) return reply(ONLGROUP)
if (!isBotAdmins) return reply(botAdmin)
if (!isAdmins) return reply(ADMIN)

        await conn.groupSettingUpdate(mek.chat, 'announcement')
        const sendmsg = await conn.sendMessage(mek.chat.G_MUTE)
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('🛑 GROUP IS CLOSED MY BOT OWNER')
l(e)
}
})



cmd({
    pattern: "unmute",
    react: "�",
    desc: "open a group",
    category: "group",
    use: '.unmute',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{                   
if (!isGroup) return reply(ONLGROUP)
if (!isBotAdmins) return reply(botAdmin)
if (!isAdmins) return reply(ADMIN)

        await conn.groupSettingUpdate(mek.chat, 'not_announcement')
        const sendmsg = await conn.sendMessage(mek.chat.G_UNMUTE)
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('🛑 GROUP IS OPEN MY BOT OWNER')
l(e)
}
})


cmd({
    pattern: "promote",
    react: "📍",
    desc: "promote admin to a member",
    category: "group",
    use: '.promote',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{                   
if (!isGroup) return reply(ONLGROUP)
if (!isBotAdmins) return reply(botAdmin)
if (!isAdmins) return reply(ADMIN)

         let users = mek.mentionedJid ? mek.mentionedJid : mek.quoted ? mek.quoted.sender : q.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                await conn.groupParticipantsUpdate(mek.chat, [users], 'promote').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
        reply('🛑 GROUP ADMIN PROMOTE BY MY BOT OWNER')
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('*Done ✓✓*')
l(e)
}
}) 


cmd({
    pattern: "demote",
    react: "📍",
    desc: "demote admin to a member",
    category: "group",
    use: '.demote',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{                   
if (!isGroup) return reply(ONLGROUP)
if (!isBotAdmins) return reply(botAdmin)
if (!isAdmins) return reply(ADMIN)

                 let users = mek.mentionedJid ? mek.mentionedJid : mek.quoted ? mek.quoted.sender : q.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                await conn.groupParticipantsUpdate(mek.chat, [users], 'demote').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
reply('🛑 GROUP ADMIN DEMOTE BY MY BOT OWNER')
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('*Done ✓✓*')
l(e)
}
})


cmd({
pattern: "del",
react: "❌",
alias: [","],
desc: "delete message",
category: "group",
use: '.del',
filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
if (!isOwner ||  !isAdmins) return;
try{
if (!m.quoted) return reply(mg.notextfordel);
const key = {
            remoteJid: m.chat,
            fromMe: false,
            id: m.quoted.id,
            participant: m.quoted.sender
        }
        await conn.sendMessage(m.chat, { delete: key })
} catch(e) {
console.log(e);
reply('Error!!')
} 
})


cmd({
    pattern: "remove",
    desc: "Remove a member from the group.",
    category: "group",
    react: "🚫",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in a group.')
        if (!isBotAdmins) return reply('Bot must be an admin to use this command.')
        if (!isAdmins) return reply('You must be an admin to use this command.')

        const user = m.mentioned[0] || m.quoted?.sender
        if (!user) return reply('Please tag or reply to a user to remove.')

        await conn.groupParticipantsUpdate(from, [user], 'remove')
        await reply(`@${user.split('@')[0]} has been removed from the group.`, { mentions: [user] })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})


cmd({
    pattern: "add",
    desc: "Add a member to the group.",
    category: "group",
    react: "✅",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in a group.')
        if (!isBotAdmins) return reply('Bot must be an admin to use this command.')
        if (!isAdmins) return reply('You must be an admin to use this command.')

        const user = q.split(' ')[0]
        if (!user) return reply('Please provide a phone number to add.')

        await conn.groupParticipantsUpdate(from, [`${user}@s.whatsapp.net`], 'add')
        await reply(`@${user} has been added to the group.`, { mentions: [`${user}@s.whatsapp.net`] })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})


cmd({
    pattern: "setgoodbye",
    desc: "Set the goodbye message for the group.",
    category: "group",
    react: "👋",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in a group.')
        if (!isBotAdmins) return reply('Bot must be an admin to use this command.')
        if (!isAdmins) return reply('You must be an admin to use this command.')

        const goodbye = q
        if (!goodbye) return reply('Please provide a goodbye message.')

        await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: goodbye })
        await reply('Goodbye message has been set.')
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})


cmd({
    pattern: "setwelcome",
    desc: "Set the welcome message for the group.",
    category: "group",
    react: "👋",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in a group.')
        if (!isBotAdmins) return reply('Bot must be an admin to use this command.')
        if (!isAdmins) return reply('You must be an admin to use this command.')

        const welcome = q
        if (!welcome) return reply('Please provide a welcome message.')

        await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: welcome })
        await reply('Welcome message has been set.')
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})


cmd({
    pattern: "kick",
    react: "🚫",
    alias: [".."],
    desc: "Kicks replied/quoted user from group.",
    category: "group",
    filename: __filename,
    use: '<quote|reply|number>',
},           
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
if(!isOwner ||  !isAdmins)return;
try {
    if (!m.isGroup) return reply(mg.onlygroup);
    if (!isBotAdmins) return reply(mg.needbotadmins);


const user = m.quoted.sender;
if (!user) return reply(mg.nouserforkick);
await conn.groupParticipantsUpdate(m.chat, [user], "remove");
reply(mg.userremoved);
} catch (e) {
reply('*shadow md kick successful_✓✓*')
l(e)
}
})


cmd({
    pattern: "getpic",
    desc: "Get the group profile picture.",
    category: "group",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in a group.')

        const groupPic = await conn.getProfilePicture(from)
        await conn.sendMessage(from, { image: { url: groupPic }, caption: 'Group Profile Picture' })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})





cmd({
    pattern: "hack",
    desc: "Displays a dynamic and playful 'Hacking' message for fun.",
    category: "other",
    react: "💻",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const steps = [
            '💻 *HACK STARTING...* 💻',
            '',
            '*Initializing hacking tools...* 🛠️',
            '*Connecting to remote servers...* 🌐',
            '',
            '```[██████████] 10%``` ⏳'                                            ,
            '```[███████████████████] 20%``` ⏳'                                   ,
            '```[███████████████████████] 30%``` ⏳'                               ,
            '```[██████████████████████████] 40%``` ⏳'                            ,
            '```[███████████████████████████████] 50%``` ⏳'                       ,
            '```[█████████████████████████████████████] 60%``` ⏳'                 ,
            '```[██████████████████████████████████████████] 70%``` ⏳'            ,
            '```[██████████████████████████████████████████████] 80%``` ⏳'        ,
            '```[██████████████████████████████████████████████████] 90%``` ⏳'    ,
            '```[████████████████████████████████████████████████████] 100%``` ✅',
            '',
            '🔒 *System Breach: Successful!* 🔓',
            '🚀 *Command Execution: Complete!* 🎯',
            '',
            '*📡 Transmitting data...* 📤',
            '_🕵️‍♂️ Ensuring stealth..._ 🤫',
            '*🔧 Finalizing operations...* 🏁',
            '',
            '⚠️ *Note:* All actions are for demonstration purposes only.',
            '⚠️ *Reminder:* Ethical hacking is the only way to ensure security.',
            '',
            '> *Didula MD V2 💚 HACKING-COMPLETE ☣*'
        ];

        for (const line of steps) {
            await conn.sendMessage(from, { text: line }, { quoted: mek });
            await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay as needed
        }
    } catch (e) {
        console.log(e);
        reply(`❌ *Error:* ${e.message}`);
    }
});




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


// 4. Block User
cmd({
    pattern: "block",
    desc: "Block a user.",
    category: "owner",
    react: "🚫",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ owner command !");
    if (!quoted) return reply("❌ Please reply to the user you want to block.");

    const user = quoted.sender;
    try {
        await conn.updateBlockStatus(user, 'block');
        reply(`😑🖕 ${user} blocked successfully.`);
    } catch (error) {
        reply(`❌ Error blocking user: ${error.message}`);
    }
});

// 5. Unblock User
cmd({
    pattern: "unblock",
    desc: "Unblock a user.",
    category: "owner",
    react: "✅",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted) return reply("❌ Please reply to the user you want to unblock.");

    const user = quoted.sender;
    try {
        await conn.updateBlockStatus(user, 'unblock');
        reply(`✅ User ${user} unblocked successfully.`);
    } catch (error) {
        reply(`❌ Error unblocking user: ${error.message}`);
    }
});

// 6. Clear All Chats
cmd({
    pattern: "clearchats",
    desc: "Clear all chats from the bot.",
    category: "owner",
    react: "🧹",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    try {
        const chats = conn.chats.all();
        for (const chat of chats) {
            await conn.modifyChat(chat.jid, 'delete');
        }
        reply("🧹 All chats cleared successfully!");
    } catch (error) {
        reply(`❌ Error clearing chats: ${error.message}`);
    }
});




const forwardCommand = {
    pattern: "forward",
    desc: "Forward messages",
    alias: ['fo'],
    category: "owner",
    use: ".forward <Jid address>",
    filename: __filename
};

cmd(forwardCommand, async (
    conn, // Represents the connection
    mek, // Message object
    store, // Store for additional information
    {
        from, // Origin of the message
        quoted, // Quoted message object
        q, // Query parameter (target JID)
        isOwner, // If the sender is the bot owner
        isMe,
        reply // Function to reply to the sender
    }
) => {
    // Ensure the command is executed by the owner
    if (!isOwner & !isMe) {
        return reply("*You Are Not Owner Or Bot*");
    }

    // Validate the input
    if (!q) {
        return reply("Please provide a target JID address ❌");
    }

    if (!quoted) {
        return reply("Please reply to a message you want to forward ❌");
    }

    // Extract the quoted message object
    const forwardMessage = quoted.fakeObj ? quoted.fakeObj : quoted;

    try {
        // Forward the message to the target JID
        await conn.sendMessage(q, { forward: forwardMessage }, { quoted: mek });

        // Send a confirmation to the owner
        return reply(`*Message forwarded successfully to:*\n\n${q} ✅`);
    } catch (error) {
        // Handle errors
        console.error("Error forwarding message:", error);
        return reply("Failed to forward the message ❌");
    }
});

//=======Jid
cmd({
    pattern: "jid",
    react: "💻",
    alias: ["jids"],
    desc: "Check bot\'s ping",
    category: "owner",
    use: '.ping',
    filename: __filename
},
async(conn, mek, m, {from, mnu, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

try{

reply(from)

} catch (e) {
reply(`${e}`)
console.log(e)
}
})








// 8. Group JIDs List
cmd({
    pattern: "gjid",
    desc: "Get the list of JIDs for all groups the bot is part of.",
    category: "owner",
    react: "📝",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    const groups = await conn.groupFetchAllParticipating();
    const groupJids = Object.keys(groups).join('\n');
    reply(`📝 *Group JIDs:*\n\n${groupJids}`);
});


cmd({
    pattern: "kickall",
    desc: "Kicks all non-admin members from the group.",
    react: "👏",
    category: "group",
    filename: __filename,
},           
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
      if (!isAdmins) return reply(`ɪ ɴᴇᴇᴅ ᴀᴅᴍɪɴ 💀`)
      if (!isOwner) return reply(`ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴏᴡɴᴇʀ ᴏꜰ ᴅɪᴅᴜʟᴀ ᴍᴅ`)

        // Check if the command is used in a group
        if (!isGroup) return reply(`This command is only for groups.`);

        // Check if the bot has admin privileges
        if (!isBotAdmins) return reply(`I need admin privileges to kick users.`);
        // Fetch all participants from the group
        const allParticipants = groupMetadata.participants;
        // Filter out the admins (including the bot)
        const nonAdminParticipants = allParticipants.filter(member => !groupAdmins.includes(member.id));
        if (nonAdminParticipants.length === 0) {
            return reply('There are no non-admin members to kick.');
        }
        // Start removing non-admin participants
        for (let participant of nonAdminParticipants) {
            await conn.groupParticipantsUpdate(m.chat, [participant.id], "remove");
  }
        // Send a confirmation message once done
        reply(`Didula MD V2 💚 Successfully kicked all non-admin members from the group.`);

    } catch (e) {
        console.error('Error kicking users:', e);
        reply('An error occurred while trying to kick all members. Please try again.');
    }
});


cmd({
    pattern: "groupinfo",
    desc: "Get information about the group.",
    category: "group",
    filename: __filename,
    react: "ℹ️"
},
async(conn, mek, m, { from, isGroup, groupMetadata, groupName, participants, groupAdmins, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in groups.');

        const groupInfo = `*Didula MD V2 💚*\n\n
📋 *Group Information*
👥 *Name:* ${groupName}
📝 *Description:* ${groupMetadata.desc || 'No description'}
🆔 *ID:* ${from}
👑 *Owner:* ${groupMetadata.owner || 'Not available'}
👤 *Members:* ${participants.length}
👮 *Admins:* ${groupAdmins.length}
📅 *Created:* ${new Date(groupMetadata.creation * 1000).toLocaleString()}\n\n*Didula MD V2 💚*
        `;
        reply(groupInfo);
    } catch(e) {
        console.error(e);
        reply(`❌ Error: ${e}`);
    }
});

const {cmd , commands} = require('../command')
const { fetchJson } = require('../lib/functions')

const apilink = 'https://api-pink-venom.vercel.app'
const caption = `> ᴩʀᴏᴊᴇᴄᴛꜱ ᴏꜰ ᴅɪᴅᴜʟᴀ ʀᴀꜱʜᴍɪᴋᴀ`

let logo1 = 'https://en.ephoto360.com/create-a-blackpink-style-logo-with-members-signatures-810.html'
let logo2 = `https://en.ephoto360.com/online-blackpink-style-logo-maker-effect-711.html`
let logo3 = `https://en.ephoto360.com/create-a-blackpink-neon-logo-text-effect-online-710.html`
let logo4 = `https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html`
let logo5 = `https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html`
let logo6 = `https://en.ephoto360.com/create-pixel-glitch-text-effect-online-769.html`
let logo7 = `https://en.ephoto360.com/create-online-3d-comic-style-text-effects-817.html`
let logo8 = `https://en.ephoto360.com/create-colorful-neon-light-text-effects-online-797.html`
let logo9 = `https://en.ephoto360.com/free-bear-logo-maker-online-673.html`
let logo10 = `https://en.ephoto360.com/neon-devil-wings-text-effect-online-683.html`
let logo11 = `https://en.ephoto360.com/light-text-effect-futuristic-technology-style-648.html`
let logo12 = `https://en.ephoto360.com/create-glossy-silver-3d-text-effect-online-802.html`
let logo13 = `https://en.ephoto360.com/multicolor-3d-paper-cut-style-text-effect-658.html`
let logo14 = `https://en.ephoto360.com/free-pubg-logo-maker-online-609.html`
let logo15 = `https://en.ephoto360.com/pubg-logo-maker-cute-character-online-617.html`
let logo16 = `https://en.ephoto360.com/create-free-fire-facebook-cover-online-567.html`
let logo17 = `https://en.ephoto360.com/write-text-on-wet-glass-online-589.html`
let logo18 = `https://en.ephoto360.com/create-online-typography-art-effects-with-multiple-layers-811.html`
let logo19 = `https://en.ephoto360.com/modern-gold-5-215.html`
let logo20 = `https://en.ephoto360.com/matrix-text-effect-154.html`

cmd({
    pattern: "logolist",
    desc: "Create logos",
    category: "convert",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {


if(!q) return reply("*_Please give me a text._*")

let logoMsg = `*_Didula MD V2 💚 LOGO MAKER_*

───────────────────
*Text :* ${q}
───────────────────

_🔢 Reply Below Number :_

 1 || Black Pink
 2 || Black Pink 2
 3 || Black Pink 3
 4 || Naruto
 5 || Digital Glitch
 6 || Pixel Glitch
 7 || Comic Style
 8 || Neon Light
 9 || Free Bear
10 || Devil Wings
11 || Futuristic Technology
12 || Silver 3D
13 || 3D Paper Cut
14 || Pubg 1
15 || Pubg 2
16 || Free Fire Cover
17 || Text On Wet Glass
18 || Typography
19 || Modern Gold
20 || Matrix

> ᴩʀᴏᴊᴇᴄᴛꜱ ᴏꜰ ᴅɪᴅᴜʟᴀ ʀᴀꜱʜᴍɪᴋᴀ`

const fdChannel = {
            newsletterJid: "@newsletter",
            newsletterName: "Didula MD V2 💚",
            serverMessageId: 999
          };
          const contextMsg = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: fdChannel
          };
          const msgBody = {
            image: {url:`https://i.ibb.co/tC37Q7B/20241220-122443.jpg`},
            caption: logoMsg,
            contextInfo: contextMsg
          };
        let send = await conn.sendMessage(from, msgBody, {
            'quoted': mek
          })

conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === send.key.id) {
                switch (selectedOption) {
                    case '1':

let data1 = await fetchJson(`${apilink}/api/logo?url=${logo1}&name=${q}`)
await conn.sendMessage(from, { image :{url : `${data1.result.download_url}`}, caption : `${caption}`},{quoted : mek})

                        break;
                    case '2':

let data2 = await fetchJson(`${apilink}/api/logo?url=${logo2}&name=${q}`)
await conn.sendMessage(from, { image :{url : `${data2.result.download_url}`}, caption : `${caption}`},{quoted : mek})

                    break;
                    case '3':

let data3 = await fetchJson(`${apilink}/api/logo?url=${logo3}&name=${q}`)
await conn.sendMessage(from, { image :{url : `${data3.result.download_url}`}, caption : `${caption}`},{quoted : mek})

                    break;
                    case '4':

let data4 = await fetchJson(`${apilink}/api/logo?url=${logo4}&name=${q}`)
await conn.sendMessage(from, { image :{url : `${data4.result.download_url}`}, caption : `${caption}`},{quoted : mek})

                    break;
                    case '5':

let data5 = await fetchJson(`${apilink}/api/logo?url=${logo5}&name=${q}`)
await conn.sendMessage(from, { image :{url : `${data5.result.download_url}`}, caption : `${caption}`},{quoted : mek})

                    break;
                    case '6':

let data6 = await fetchJson(`${apilink}/api/logo?url=${logo6}&name=${q}`)
await conn.sendMessage(from, { image :{url : `${data6.result.download_url}`}, caption : `${caption}`},{quoted : mek})

                    break;
                    case '7':

let data7 = await fetchJson(`${apilink}/api/logo?url=${logo7}&name=${q}`)
await conn.sendMessage(from, { image :{url : `${data7.result.download_url}`}, caption : `${caption}`},{quoted : mek})

                    break;
                    case '8':

let data8 = await fetchJson(`${apilink}/api/logo?url=${logo8}&name=${q}`)
await conn.sendMessage(from, { image :{url : `${data8.result.download_url}`}, caption : `${caption}`},{quoted : mek})

                    break;
                    case '9':

let data9 = await fetchJson(`${apilink}/api/logo?url=${logo9}&name=${q}`)
await conn.sendMessage(from, { image :{url : `${data9.result.download_url}`}, caption : `${caption}`},{quoted : mek})

                    break;
                    case '10':

let data10 = await fetchJson(`${apilink}/api/logo?url=${logo10}&name=${q}`)
await conn.sendMessage(from, { image :{url : `${data10.result.download_url}`}, caption : `${caption}`},{quoted : mek})

                    break;
                    case '11':

let data11 = await fetchJson(`${apilink}/api/logo?url=${logo11}&name=${q}`)
await conn.sendMessage(from, { image :{url : `${data11.result.download_url}`}, caption : `${caption}`},{quoted : mek})

                    break;
                    case '12':

let data12 = await fetchJson(`${apilink}/api/logo?url=${logo12}&name=${q}`)
await conn.sendMessage(from, { image :{url : `${data12.result.download_url}`}, caption : `${caption}`},{quoted : mek})

                    break;
                    case '13':

let data13 = await fetchJson(`${apilink}/api/logo?url=${logo13}&name=${q}`)
await conn.sendMessage(from, { image :{url : `${data13.result.download_url}`}, caption : `${caption}`},{quoted : mek})

                    break;
                    case '14':

let data14 = await fetchJson(`${apilink}/api/logo?url=${logo14}&name=${q}`)
await conn.sendMessage(from, { image :{url : `${data14.result.download_url}`}, caption : `${caption}`},{quoted : mek})

                    break;
                    case '15':

let data15 = await fetchJson(`${apilink}/api/logo?url=${logo15}&name=${q}`)
await conn.sendMessage(from, { image :{url : `${data15.result.download_url}`}, caption : `${caption}`},{quoted : mek})

                    break;
                    case '16':

let data16 = await fetchJson(`${apilink}/api/logo?url=${logo16}&name=${q}`)
await conn.sendMessage(from, { image :{url : `${data16.result.download_url}`}, caption : `${caption}`},{quoted : mek})

                    break;
                    case '17':

let data17 = await fetchJson(`${apilink}/api/logo?url=${logo17}&name=${q}`)
await conn.sendMessage(from, { image :{url : `${data17.result.download_url}`}, caption : `${caption}`},{quoted : mek})

                    break;
                    case '18':

let data18 = await fetchJson(`${apilink}/api/logo?url=${logo18}&name=${q}`)
await conn.sendMessage(from, { image :{url : `${data18.result.download_url}`}, caption : `${caption}`},{quoted : mek})

                    break;
                    case '19':

let data19 = await fetchJson(`${apilink}/api/logo?url=${logo19}&name=${q}`)
await conn.sendMessage(from, { image :{url : `${data19.result.download_url}`}, caption : `${caption}`},{quoted : mek})

                    break;
                    case '20':

let data20 = await fetchJson(`${apilink}/api/logo?url=${logo20}&name=${q}`)
await conn.sendMessage(from, { image :{url : `${data20.result.download_url}`}, caption : `${caption}`},{quoted : mek})

                    break;
                    default:
                        reply("*_Invalid number.Please reply a valid number._*");
                }

            }
        })

}catch(e){
console.log(e)
reply(`${e}`)
}
})



cmd({
    pattern: "downloadmenu",
    react: "👾",
    desc: "get cmd list",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let menu = '';
        for (let i = 0; i < commands.length; i++) {
            if (commands[i].category === 'download' && !commands[i].dontAddCommandList) {
                menu += `*📍➣ Command :* ${commands[i].pattern}\n*📃➣ Desc :* ${commands[i].desc}\n*⌛➣ Use:* ${commands[i].use}\n\n`;
            }
        }

        let madeMenu = `💚 *𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱 𝗠𝗲𝗻𝘂:📥*\n\n${menu}────────────────────`;

        await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: madeMenu }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`An error occurred: ${e.message}`);
    }
});

cmd({
    pattern: "mainmenu",
    react: "👾",
    desc: "get cmd list",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let menu = '';
        for (let i = 0; i < commands.length; i++) {
            if (commands[i].category === 'main' && !commands[i].dontAddCommandList) {
                menu += `*📍➣ Command :* ${commands[i].pattern}\n*📃➣ Desc :* ${commands[i].desc}\n*⌛➣ Use:* ${commands[i].use}\n\n`;
            }
        }

        let madeMenu = `💚 *𝗠𝗮𝗶𝗻 𝗠𝗲𝗻𝘂:📥*\n\n${menu}────────────────────`;

        await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: madeMenu }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`An error occurred: ${e.message}`);
    }
});

cmd({
    pattern: "groupmenu",
    react: "👾",
    desc: "get cmd list",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let menu = '';
        for (let i = 0; i < commands.length; i++) {
            if (commands[i].category === 'group' && !commands[i].dontAddCommandList) {
                menu += `*📍➣ Command :* ${commands[i].pattern}\n*📃➣ Desc :* ${commands[i].desc}\n*⌛➣ Use:* ${commands[i].use}\n\n`;
            }
        }

        let madeMenu = `💚 *𝗚𝗿𝗼𝘂𝗽 𝗠𝗲𝗻𝘂:📥*\n\n${menu}────────────────────`;

        await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: madeMenu }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`An error occurred: ${e.message}`);
    }
});

cmd({
    pattern: "ownermenu",
    react: "👾",
    desc: "get cmd list",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let menu = '';
        for (let i = 0; i < commands.length; i++) {
            if (commands[i].category === 'owner' && !commands[i].dontAddCommandList) {
                menu += `*📍➣ Command :* ${commands[i].pattern}\n*📃➣ Desc :* ${commands[i].desc}\n*⌛➣ Use:* ${commands[i].use}\n\n`;
            }
        }

        let madeMenu = `💚 *𝗢𝘄𝗻𝗲𝗿 𝗠𝗲𝗻𝘂:📥*\n\n${menu}────────────────────`;

        await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: madeMenu }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`An error occurred: ${e.message}`);
    }
});

cmd({
    pattern: "convertmenu",
    react: "👾",
    desc: "get cmd list",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let menu = '';
        for (let i = 0; i < commands.length; i++) {
            if (commands[i].category === 'convert' && !commands[i].dontAddCommandList) {
                menu += `*📍➣ Command :* ${commands[i].pattern}\n*📃➣ Desc :* ${commands[i].desc}\n*⌛➣ Use:* ${commands[i].use}\n\n`;
            }
        }

        let madeMenu = `💚 *𝗖𝗼𝗻𝘃𝗲𝗿𝘁 𝗠𝗲𝗻𝘂:📥*\n\n${menu}────────────────────`;

        await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: madeMenu }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`An error occurred: ${e.message}`);
    }
});

cmd({
    pattern: "searchmenu",
    react: "👾",
    desc: "get cmd list",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let menu = '';
        for (let i = 0; i < commands.length; i++) {
            if (commands[i].category === 'search' && !commands[i].dontAddCommandList) {
                menu += `*📍➣ Command :* ${commands[i].pattern}\n*📃➣ Desc :* ${commands[i].desc}\n*⌛➣ Use:* ${commands[i].use}\n\n`;
            }
        }

        let madeMenu = `💚 *𝗦𝗲𝗮𝗿𝗰𝗵 𝗠𝗲𝗻𝘂:📥*\n\n${menu}────────────────────`;

        await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: madeMenu }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`An error occurred: ${e.message}`);
    }
});



cmd({
    pattern: "opentime",
    react: "🔖",
    desc: "To open group to a time",
    category: "group",
    use: '.opentime',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{   
if (!isGroup) return reply(ONLGROUP)
if (!isAdmins) return reply(ADMIN)        
  if (args[1] == 'second') {
                    var timer = args[0] * `1000`
                } else if (args[1] == 'minute') {
                    var timer = args[0] * `60000`
                } else if (args[1] == 'hour') {
                    var timer = args[0] * `3600000`
                } else if (args[1] == 'day') {
                    var timer = args[0] * `86400000`
                } else {
                    return reply('*select:*\nsecond\nminute\nhour\n\n*example*\n10 second')
                }
                reply(`Open time ${q} starting from now`)
                setTimeout(() => {
                    var nomor = mek.participant
                    const open = `*OPEN TIME* THE GROUP WAS OPENED BY AWAIS MD TO APPROVED ADMIN\n NOW MEMBERS CAN SEND MESSAGES 🔓`
                    conn.groupSettingUpdate(from, 'not_announcement')
                    reply(open)
                }, timer)
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "closetime",
    react: "🔖",
    desc: "To close group to a time",
    category: "group",
    use: '.closstime',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{   
if (!isGroup) return reply(ONLGROUP)
if (!isAdmins) return reply(ADMIN)        
                if (args[1] == 'second') {
                    var timer = args[0] * `1000`
                } else if (args[1] == 'minute') {
                    var timer = args[0] * `60000`
                } else if (args[1] == 'hour') {
                    var timer = args[0] * `3600000`
                } else if (args[1] == 'day') {
                    var timer = args[0] * `86400000`
                } else {
                    return reply('*select:*\nsecond\nminute\nhour\n\n*Example*\n10 second')
                }
                reply(`Close time ${q} starting from now`)
                setTimeout(() => {
                    var nomor = m.participant
                    const close = `*CLOSE TIME* GROUP CLOSED BY AWAIS MD AT APPROVED ADMIN\nNOW ONLY ADMIN CAN SEND MESSAGES 🔐`
                    conn.groupSettingUpdate(from, 'announcement')
                    reply(close)
                }, timer)
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('*Error !!*')
l(e)
}
})


cmd({
    pattern: "tagadmin",
    alais:["tagadmins"],
    react: "🙀",
    desc: "Tags all the admins in the group.",
    category: "group",
    filename: __filename,
},           
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
        // Check if the command is used in a group
        if (!isGroup) return reply(`This command is only for groups.`);
        if (!isAdmins) return reply(`This command is only for group admin.`);

        // Fetch all group admins
        const admins = groupAdmins;
        if (admins.length === 0) {
            return reply('There are no admins in this group.');
        }
        // Create a message with all admin tags
        let adminTagMessage = '*TAGGING ALL ADMINS IN THE GROUP 🔳:*\n\n';
        for (let admin of admins) {
            adminTagMessage += `@${admin.split('@')[0]}\n`;  // Mention each admin by their number
        }
        // Send the message and tag the admins
        await conn.sendMessage(from, { text: adminTagMessage, mentions: admins }, { quoted: mek });
    } catch (e) {
        console.error('Error tagging admins:', e);
        reply('you are not an admin.');
    }
})


cmd({
    pattern: "alive",
    desc: "Check if the bot is alive.",
    category: "main",
    react: "✅",
    filename: __filename
}, async (conn, mek, m, { from, quoted, reply }) => {
    try {


        // Send a message indicating the bot is alive
        const message = await conn.sendMessage(from, { text: '`𝗗𝗶𝗱𝘂𝗹𝗮 𝗠𝗗 𝗶𝘀 𝗔𝗹𝗶𝘃𝗲 𝗡𝗼𝘄💚`' });

        // Simulate some processing time
        const startTime = Date.now();
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulating a delay
        const endTime = Date.now();
        const ping = endTime - startTime;

        // Send the alive response with additional information
        await conn.sendMessage(from, {
            document: { url: pdfUrl }, // Path to your PDF file
            fileName: 'Didula MD💚', // Filename for the document
            mimetype: "application/pdf",
            fileLength: 99999999999999,
            image: { url: 'https://i.ibb.co/tC37Q7B/20241220-122443.jpg' },
            pageCount: 2024,
            caption: `𝗗𝗶𝗱𝘂𝗹𝗮 𝗠𝗗 𝗩𝟮 𝗜𝘀 𝗔𝗹𝗶𝘃𝗲! \n\n⏰ 𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲 𝗧𝗶𝗺𝗲 : ${ping} ms\n\n𝗧𝘆𝗽𝗲   .𝗺𝗲𝗻𝘂 𝗼𝗿 .𝗹𝗶𝘀𝘁 𝗳𝗼𝗿 𝗴𝗲𝘁 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀\n\nDidula MD V2 💚`,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterName: 'Didula MD V2 💚',
                    newsletterJid: "120363343196447945@newsletter",
                },
                externalAdReply: {
                    title: '©Didula MD V2 💚',
                    body: ' *Didula MD V2 💚*',
                    thumbnailUrl: 'https://i.ibb.co/tC37Q7B/20241220-122443.jpg',
                    sourceUrl: 'https://wa.me/message/DIDULLTK7ZOGH1',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });

    } catch (e) {
        console.error(e);
        reply(`${e}`);
    }
});

const config = require('../config')
const {cmd , commands} = require('../command')
const {sleep} = require('../lib/functions')

cmd({
    pattern: "restart",
    desc: "restart the bot",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const {exec} = require("child_process")
reply("Didula MD V2 💚 restarting...")
await sleep(1500)
exec("pm2 restart all")
}catch(e){
console.log(e)
reply(`${e}`)
}
})

const {
  fetchJson
} = require('../lib/functions')
const config = require('../config')
const {
  cmd,
  commands
} = require('../command')
const yts = require('yt-search')

cmd( {
  pattern: "song",
  react: "🎵",
  desc: "Download songs",
  category: "download",
  filename: __filename
},
  async (conn, mek, m, {
    from, q, reply
  }) => {
    try {
      if (!q) return reply('⛔please give a song title')
      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;
      const formatViews = views => views >= 1_000_000_000 ? `${(views / 1_000_000_000).toFixed(1)}B`: views >= 1_000_000 ? `${(views / 1_000_000).toFixed(1)}M`: views >= 1_000 ? `${(views / 1_000).toFixed(1)}K`: views.toString();
      let desc = `
 🌟 *Song Spotlight: Didula MD V2* 🌟

🎵 *Title:* ${data.title}  
👤 *Artist:* ${data.author.name}  
📝 *Description:* ${data.description}  
⏰ *Duration:* ${data.timestamp}  
⏱️ *Posted:* ${data.ago} ago  
👁️ *Views:* ${formatViews(data.views)}  

---

🔗 *Options:*  
1️⃣ Listen to Audio 🎶  
2️⃣ Download Documents 📂  

> 🔱 𝐏𝐫𝐨𝐣𝐞𝐜𝐭𝐬 𝐎𝐟 𝐃𝐢𝐝𝐮𝐥𝐚 𝐑𝐚𝐬𝐡𝐦𝐢𝐤𝐚 💀🙌 `;
      const or = await conn.sendMessage(from, {
        image: {
          url: data.thumbnail
        }, caption: desc
      }, {
        quoted: mek
      });

      const data1 = await fetchJson(`https://apitest1-f7dcf17bd59b.herokuapp.com/download/ytmp3?url=${url}`)
      //========

      conn.ev.on('messages.upsert', async (msgUpdate) => {
        const msg = msgUpdate.messages[0];
        if (!msg.message || !msg.message.extendedTextMessage) return;

        const selectedOption = msg.message.extendedTextMessage.text.trim();

        if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === or.key.id) {
          switch (selectedOption) {
            case '1':
              await conn.sendMessage(from, {
                audio: {
                  url: data1.result.dl_link
                }, mimetype: "audio/mpeg"
              }, {
                quoted: mek
              });
              await conn.sendMessage(from, {
                react: {
                  text: '✔️', key: mek.key
                }})
              break
            case '2':
              await conn.sendMessage(from, {
                document: {
                  url: data1.result.dl_link
                }, mimetype: "audio/mpeg", fileName: `${data.title}.mp3`, caption: "> Didula MD V2 💚 "
              }, {
                quoted: mek
              });
              await conn.sendMessage(from, {
                react: {
                  text: '✔️', key: mek.key
                }})
              break
            default:
              reply("Invalid option. Please select a valid option🔴");
            }
          }
        })

      } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
      }
    });

  //video ===================

  cmd( {
    pattern: "video",
    react: "📽️",
    desc: "Download songs",
    category: "download",
    filename: __filename
  },
    async (conn, mek, m, {
      from,
      q,
      reply
    }) => {
      try {
        if (!q) return reply('⛔please give a video title')
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;
        const formatViews = views => views >= 1_000_000_000 ? `${(views / 1_000_000_000).toFixed(1)}B`: views >= 1_000_000 ? `${(views / 1_000_000).toFixed(1)}M`: views >= 1_000 ? `${(views / 1_000).toFixed(1)}K`: views.toString();
        let dec = `
🌟 *Video Spotlight: Didula MD V2* 🌟

🎵 *Title:* ${data.title}  
👤 *Artist:* ${data.author.name}  
📝 *Description:* ${data.description}  
⏰ *Duration:* ${data.timestamp}  
⏱️ *Posted:* ${data.ago} ago  
👁️ *Views:* ${formatViews(data.views)}  

---

🔗 *Options:*  
1️⃣ Watch to Video 🎶  
2️⃣ Download Documents 📂  `;

        const or = await conn.sendMessage(from, {
          image: {
            url: data.thumbnail
          }, caption: dec
        }, {
          quoted: mek
        });
        const data1 = await fetchJson(`https://api.giftedtech.my.id/api/download/dlmp4?apikey=gifted&url=${url}`)


        conn.ev.on('messages.upsert', async (msgUpdate) => {
          const msg = msgUpdate.messages[0];
          if (!msg.message || !msg.message.extendedTextMessage) return;

          const selectedOption = msg.message.extendedTextMessage.text.trim();

          if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === or.key.id) {
            switch (selectedOption) {
            case '1':
              await conn.sendMessage(from, {
                audio: {
                  url: data1.result.download_url
                }, mimetype: "video/mp4"
              }, {
                quoted: mek
              });
              await conn.sendMessage(from, {
                react: {
                  text: '✔️', key: mek.key
                }})
              break
            case '2':
              await conn.sendMessage(from, {
                document: {
                  url: data1.result.download_url
                }, mimetype: "video/mp4", fileName: `${data.title}.mp4`, caption: "> Didula MD V2 💚 "
              }, {
                quoted: mek
              });
              await conn.sendMessage(from, {
                react: {
                  text: '✔️', key: mek.key
                }})
              break
            default:
              reply("Invalid option. Please select a valid option🔴");
            }
          }
        })
      } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
      }
    });
    
    const si = require('systeminformation'); // Import systeminformation for system data

cmd({
    pattern: "sysinfo",
    alias: ["system"],
    react: "🖥️",
    desc: "Get system information",
    category: "main",
    use: '.sysinfo',
    filename: __filename
},
async(conn, mek, m, { from, reply }) => {
    try {
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


cmd({
    pattern: "vv",
    react: "👀",
    alias: ["rvo"],
    dontAddCommandList: true,
    use: '.vv',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try {
const quot = m.msg.contextInfo.quotedMessage.viewOnceMessageV2;
if(quot)
{
if(quot.message.imageMessage) 
{ console.log("Quot Entered") 
   let cap = quot.message.imageMessage.caption;
   let anu = await conn.downloadAndSaveMediaMessage(quot.message.imageMessage)
   return conn.sendMessage(m.chat,{image:{url : anu},caption : cap })
}
if(quot.message.videoMessage) 
{
   let cap = quot.message.videoMessage.caption;
   let anu = await conn.downloadAndSaveMediaMessage(quot.message.videoMessage)
   return conn.sendMessage(m.chat,{video:{url : anu},caption : cap })
}

}

} catch(e) {  console.log("error" , e ) }     


if(!m.quoted) return m.reply("```Uh Please Reply A ViewOnce Message```")           
if(m.quoted.mtype === "viewOnceMessage")
{ console.log("ViewOnce Entered") 
 if(m.quoted.message.imageMessage )
{ 
  let cap = m.quoted.message.imageMessage.caption;
  let anu = await conn.downloadAndSaveMediaMessage(m.quoted.message.imageMessage)
  conn.sendMessage(m.chat,{image:{url : anu},caption : cap })
}
else if(m.quoted.message.videoMessage )
{
  let cap = m.quoted.message.videoMessage.caption;
  let anu = await conn.downloadAndSaveMediaMessage(m.quoted.message.videoMessage)
  conn.sendMessage(m.chat,{video:{url : anu},caption : cap })
}

}
else return m.reply("```This is Not A ViewOnce Message```")
})



cmd({
    pattern: "wallpaper",
    alias: ["wallpaperdownload"],
    react: "🖼️",
    desc: "Download a random wallpaper",
    category: "download",
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
        await conn.sendMessage(from, { image: { url: selectedImage }, caption: "Here is your wallpaper!" }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply('An error occurred while downloading the wallpaper. Please try again later.');
    }
});


