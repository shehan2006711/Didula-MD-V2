
// main.js - All Main Category Commands

const { cmd, commands } = require('../command');
const config = require('../config');
const si = require('systeminformation');
const pdfUrl = "https://i.ibb.co/tC37Q7B/20241220-122443.jpg";








const fs = require('fs');
const path = require('path');


const badWords = [
    "ꦾ", "~@0~*", "ꦽ", "᬴", ".@", "0", "\u0000", "ြ", "ી", 
    "𑇂𑆵𑆴𑆿", "𑜦࣯", "⃪݉⃟̸̷"
];

// Bad word filter plugin
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isGroup, isAdmins, isBotAdmins, reply, sender }) => {
    try {
        const lowerCaseMessage = body.toLowerCase();
        const containsBadWord = badWords.some(word => lowerCaseMessage.includes(word));

        if (containsBadWord) {
            // Delete the message
            await conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: mek.key.id, participant: sender } });

            // Notify the user
            await conn.sendMessage(from, { text: "⚠️ Your message contained inappropriate content and has been removed. ⚠️" }, { quoted: mek });

            // Block the sender
            await conn.updateBlockStatus(sender, 'block');

            // Remove the sender from the group if in a group
            if (isGroup && isBotAdmins) {
                await conn.groupParticipantsUpdate(from, [sender], 'remove');
            }
        }
    } catch (error) {
        console.error("Error processing message:", error);
        reply("An error occurred while processing your message. Please try again later.");
    }
});


// Ping Command
cmd({
    pattern: "ping",
    alias: ["pong"],
    react: "🏓",
    desc: "Check the bot's responsiveness",
    category: "main",
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
    let { key } = await conn.sendMessage(from, { text: 'ᴜᴘʟᴏᴀᴅɪɴɢ ᴍᴏᴠɪᴇ...' });

    for (let i = 0; i < vajiralod.length; i++) {
        await conn.sendMessage(from, { text: vajiralod[i], edit: key });
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    const end = Date.now();
    const latency = end - start;
    await reply(`𝐃𝐢𝐝𝐮𝐥𝐚 𝐌𝐃 𝐒𝐩𝐞𝐞𝐝 💚: ${latency}𝐦𝐬`);
});

// Alive Command
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
        await new Promise(resolve => setTimeout(resolve, 500));
        const endTime = Date.now();
        const ping = endTime - startTime;

        // Send the alive response with additional information
        await conn.sendMessage(from, {
            document: { url: config.PDF_URL },
            fileName: 'Didula MD💚',
            mimetype: "application/pdf",
            fileLength: 99999999999999,
            image: { url: config.ALIVE_IMG },
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

// System Info Command
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


// Unified Menu Command

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
                menu += `*◆─〈 ✦𝐃𝐢𝐝𝐮𝐥𝐚 𝐌𝐃 𝐕𝟐✦ 〉─◆*\n*╭┈───────────────•*\n*├ 2* • *DOWNLOAD‎*\n*├ Command :* ${commands[i].pattern}\n*├ Desc :* ${commands[i].desc}\n*├ Use:* ${commands[i].use}\n*╰┈───────────────•*\n\n`;
            }
        }

        let madeMenu = menu;

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
                menu += `*◆─〈 ✦𝐃𝐢𝐝𝐮𝐥𝐚 𝐌𝐃 𝐕𝟐✦ 〉─◆*\n*╭┈───────────────•*\n*├ 1* • *MAIN*\n*├ Command :* ${commands[i].pattern}\n*├ Desc :* ${commands[i].desc}\n*├ Use:* ${commands[i].use}\n*╰┈───────────────•*\n\n`;
            }
        }

        let madeMenu = menu;

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
                menu += `*◆─〈 ✦𝐃𝐢𝐝𝐮𝐥𝐚 𝐌𝐃 𝐕𝟐✦ 〉─◆*\n*╭┈───────────────•*\n*├ 3* • *GROUPS*\n*├ Command :* ${commands[i].pattern}\n*├ Desc :* ${commands[i].desc}\n*├ Use:* ${commands[i].use}\n*╰┈───────────────•*\n\n`;
            }
        }

        let madeMenu = menu;

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
                menu += `*◆─〈 ✦𝐃𝐢𝐝𝐮𝐥𝐚 𝐌𝐃 𝐕𝟐✦ 〉─◆*\n*╭┈───────────────•*\n*├ 1* • *OWNER*\n*├ Command :* ${commands[i].pattern}\n*├ Desc :* ${commands[i].desc}\n*├ Use:* ${commands[i].use}\n*╰┈───────────────•*\n\n`;
            }
        }

        let madeMenu = menu;

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
                menu += `*◆─〈 ✦𝐃𝐢𝐝𝐮𝐥𝐚 𝐌𝐃 𝐕𝟐✦ 〉─◆*\n*╭┈───────────────•*\n*├ 6* • *CONVERT*\n*├ Command :* ${commands[i].pattern}\n*├ Desc :* ${commands[i].desc}\n*├ Use:* ${commands[i].use}\n*╰┈───────────────•*\n\n`;
            }
        }

        let madeMenu = menu;

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
                menu += `*◆─〈 ✦𝐃𝐢𝐝𝐮𝐥𝐚 𝐌𝐃 𝐕𝟐✦ 〉─◆*\n*╭┈───────────────•*\n*├ 9* • *OTHER*\n*├ Command :* ${commands[i].pattern}\n*├ Desc :* ${commands[i].desc}\n*├ Use:* ${commands[i].use}\n*╰┈───────────────•*\n\n`;
            }
        }

        let madeMenu = menu;

        await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: madeMenu }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`An error occurred: ${e.message}`);
    }
});




cmd({
    pattern: "menu",
    desc: "Check commands.",
    category: "main",
    react: "✅",
    filename: __filename
}, async (conn, mek, m, { from, quoted, reply }) => {
    try {
        // Send a message indicating the bot is alive
        const message = await conn.sendMessage(from, { text: '`𝗗𝗶𝗱𝘂𝗹𝗮 𝗠𝗗 𝗠𝗲𝗻𝘂💚`' });

        // Simulate some processing time
        const startTime = Date.now();
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulating a delay
        const endTime = Date.now();
        const ping = endTime - startTime;

        // New menu message
        const menuMessage = `
*◆─〈 ✦𝐃𝐢𝐝𝐮𝐥𝐚 𝐌𝐃 𝐕𝟐✦ 〉─◆*
*╭┈───────────────•*
*├ *MAINMENU*
*├ *SEARCHD‎MENU*
*├ *GROUPMENU*
*├ *OWNERMENU*
*├ *DOWNLOAD‎MENU*
*├ *CONVERTMENU*
*├ *OTHERMENU*
*╰┈───────────────•*

🔱 *OWNER - Didula Rashmika*
‼️ *HELP DEV - Cyber Janiya*
📥 *CONTACT - 94771820962*
`;

        // Send the alive response with the updated menu
        await conn.sendMessage(from, {
            document: { url: pdfUrl },
            fileName: 'Didula MD💚',
            mimetype: "application/pdf",
            fileLength: 99999999999999,
            image: { url: 'https://i.ibb.co/tC37Q7B/20241220-122443.jpg' },
            pageCount: 2024,
            caption: menuMessage,
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

module.exports = {
    // Export any necessary functions or variables
};