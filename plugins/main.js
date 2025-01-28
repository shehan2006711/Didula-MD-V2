
// main.js - All Main Category Commands

const { cmd, commands } = require('../command');
const config = require('../config');
const si = require('systeminformation');
const pdfUrl = "https://i.ibb.co/tC37Q7B/20241220-122443.jpg";
const fs = require('fs');
const path = require('path')



cmd({
    pattern: "bug",
    desc: "Check if the bot is alive.",
    category: "main",
    react: "✅",
    filename: __filename
}, async (conn, mek, m, { from, quoted, reply }) => {
    try {
        // Send a message indicating the bot is alive
        await conn.sendMessage(from, { text: '*◆─〈 ✦𝐃𝐢𝐝𝐮𝐥𝐚 𝐌𝐃 𝐕𝟐✦ 〉─◆*' });

        // Simulate some processing time
        const startTime = Date.now();
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulating a delay
        const endTime = Date.now();
        const ping = endTime - startTime; // Capture the ping time

        // Send the alive response with additional information
        await conn.sendMessage(from, {
            document: { url: pdfUrl }, // Ensure pdfUrl is defined
            fileName: '〈 ✦𝐃𝐢𝐝𝐮𝐥𝐚 𝐌𝐃 𝐕𝟐✦ 〉', // Filename for the document
            mimetype: "application/pdf",
            fileLength: 99999999999999, // Adjust file length as necessary
            image: { url: 'https://i.ibb.co/tC37Q7B/20241220-122443.jpg' },
            pageCount: 2024,
            caption: "`UI Youko`\n>  ͆ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺\n" + "ી".repeat(55),
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterName: '〈 ✦𝐃𝐢𝐝𝐮𝐥𝐚 𝐌𝐃 𝐕𝟐✦ 〉',
                    newsletterJid: "120363343196447945@newsletter",
                },
                externalAdReply: {
                    title: '©〈 ✦𝐃𝐢𝐝𝐮𝐥𝐚 𝐌𝐃 𝐕𝟐✦ 〉',
                    body: ' *〈 ✦𝐃𝐢𝐝𝐮𝐥𝐚 𝐌𝐃 𝐕𝟐✦ 〉*',
                    thumbnailUrl: 'https://i.ibb.co/tC37Q7B/20241220-122443.jpg',
                    sourceUrl: 'https://wa.me/message/DIDULLTK7ZOGH1',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });

    } catch (e) {
        console.error(e); // Log the error for debugging
        reply(`An error occurred: ${e.message || e}`); // Provide a user-friendly error message
    }
});

cmd({
    pattern: "anime",
    desc: "anime the bot",
    category: "main",
    react: "⛱️",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let dec = `*◆─〈 ✦𝐃𝐢𝐝𝐮𝐥𝐚 𝐌𝐃 𝐕𝟐✦ 〉─◆*`
await conn.sendMessage(from,{image:{url: `https://telegra.ph/file/b26f27aa5daaada031b90.jpg`},caption:dec},{quoted:mek});
await conn.sendMessage(from,{image:{url: `https://telegra.ph/file/51b44e4b086667361061b.jpg`},caption:dec},{quoted:mek});
await conn.sendMessage(from,{image:{url: `https://telegra.ph/file/7d165d73f914985542537.jpg`},caption:dec},{quoted:mek});
await conn.sendMessage(from,{image:{url: `https://telegra.ph/file/3d9732d2657d2d72dc102.jpg`},caption:dec},{quoted:mek});
await conn.sendMessage(from,{image:{url: `https://telegra.ph/file/8daf7e432a646f3ebe7eb.jpg`},caption:dec},{quoted:mek});
await conn.sendMessage(from,{image:{url: `https://telegra.ph/file/7514b18ea89da924e7496.jpg`},caption:dec},{quoted:mek});
await conn.sendMessage(from,{image:{url: `https://telegra.ph/file/ce9cb5acd2cec7693d76b.jpg`},caption:dec},{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})






cmd({
    pattern: "allmenu",
    alias: ["list"],
    react: "📜",
    desc: "Get all commands list.",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, quoted, reply }) => {
    try {
        let menu = '';
        for (let i = 0; i < commands.length; i++) {
            if (!commands[i].dontAddCommandList) {
                menu += `*◆─〈 ✦𝐃𝐢𝐝𝐮𝐥𝐚 𝐌𝐃 𝐕𝟐✦ 〉─◆*\n*╭┈───────────────•*\n*├ Command :* ${commands[i].pattern}\n*├ Desc :* ${commands[i].desc}\n*├ Use:* ${commands[i].use}\n*╰┈───────────────•*\n\n`;
            }
        }

        let madeMenu = menu;
        if (madeMenu === '') {
            madeMenu = 'No commands available at the moment.';
        }

        await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: madeMenu }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`An error occurred: ${e.message}`);
    }
});



cmd({
    pattern: "broadcast",
    fromMe: true,
    desc: "📢 Broadcast a message to all chats",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { args, reply }) => {
    const message = args.join(" ");
    if (!message) return reply("❗ Please provide a message to broadcast.");

    const chats = await conn.getAllChats();
    let successCount = 0;

    for (let chat of chats) {
        try {
            await conn.sendMessage(chat.id, { text: `📢 *DIDULA MD V2 💚 BROADCAST MESSAGE*\n\n${message}` });
            successCount++;
        } catch (error) {
            console.error(`Failed to send broadcast to ${chat.id}:`, error);
        }
    }

    reply(`✅ Broadcast sent to ${successCount} chats successfully!`);
});

//======================================================================================================================
cmd({
    pattern: "ban",
    fromMe: true,
    desc: "🚫 Ban a user from using the bot",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { args, reply, isOwner }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!args[0]) return reply("❗ Please provide a user's number to ban.");

    const userToBan = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    config.banned.push(userToBan);

    reply(`🚫 User ${args[0]} has been banned from using the bot.`);
});

//======================================================================================================================
cmd({
    pattern: "unban",
    desc: "✅ Unban a user",
    fromMe: true,
    category: "main",
    filename: __filename
}, async (conn, mek, m, { args, reply, isOwner }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!args[0]) return reply("❗ Please provide a user's number to unban.");

    const userToUnban = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    config.banned = config.banned.filter(user => user !== userToUnban);

    reply(`✅ User ${args[0]} has been unbanned.`);
});

//======================================================================================================================
cmd({
    pattern: "setbotname",
    desc: "✏️ Change the bot's name",
    fromMe: true,
    category: "main",
    filename: __filename
}, async (conn, mek, m, { args, reply, isOwner }) => {
    if (!isOwner) return reply("❌ You are not the owner!");

    const newName = args.join(" ");
    if (!newName) return reply("❗ Please provide a new name for the bot.");

    await conn.updateProfileName(newName);
    reply(`✅ Bot's name has been changed to: *${newName}*`);
});

//======================================================================================================================
cmd({
    pattern: "setbotbio",
    desc: "✏️ Change the bot's bio",
    fromMe: true,
    category: "main",
    filename: __filename
}, async (conn, mek, m, { args, reply, isOwner }) => {
    if (!isOwner) return reply("❌ You are not the owner!");

    const newBio = args.join(" ");
    if (!newBio) return reply("❗ Please provide a new bio for the bot.");

    await conn.updateProfileStatus(newBio);
    reply(`✅ Bot's bio has been changed to: *${newBio}*`);
});

//======================================================================================================================


//======================================================================================================================
cmd({
    pattern: "setpp",
    desc: "🖼️ Set bot's profile picture",
    fromMe: true,
    category: "main",
    filename: __filename
}, async (conn, mek, m, { reply, isOwner }) => {
    if (!isOwner) return reply("❌ You are not the owner!");

    const media = m.message?.imageMessage || m.message?.videoMessage;
    if (!media || !media.url) return reply("❗ No image or video found.");

    try {
        const buffer = await conn.downloadMediaMessage(m);
        await conn.updateProfilePicture(buffer);
        reply("✅ Profile picture has been updated.");
    } catch (error) {
        console.error("Failed to update profile picture:", error);
        reply("❗ Failed to update profile picture.");
    }
});

let autoBioInterval;

//======================================================================================================================
cmd({
    pattern: "setautobio",
    alias: ["autobio"],
    fromMe: true,
    desc: "Enable or disable the AutoBIO feature.",
    category: "main",
    react: "🛠️",
    filename: __filename
}, async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");

    config.autoBioEnabled = !config.autoBioEnabled;

    if (config.autoBioEnabled) {
        reply("🛠️ AutoBIO feature has been *enabled*! 🔄");
        startAutoBio(conn);
    } else {
        reply("🛠️ AutoBIO feature has been *disabled*! 🚫");
        stopAutoBio();
    }
});

// 2. Start AutoBIO
function startAutoBio(conn) {
    // Clear any existing interval to avoid duplicates
    if (autoBioInterval) clearInterval(autoBioInterval);

    // Set a new interval to update the bio every minute (or any preferred time)
    autoBioInterval = setInterval(async () => {
        const time = new Date().toLocaleTimeString();  // Get the current time
        const bioText = `Didula MD V2 💚`;  // Set the bio text with time
        await conn.updateProfileStatus(bioText);  // Update the bot's bio
    }, 60 * 1000);  // 1 minute interval
}

// 3. Stop AutoBIO
function stopAutoBio() {
    if (autoBioInterval) {
        clearInterval(autoBioInterval);  // Stop the interval
        autoBioInterval = null;
        console.log("🛠️ AutoBIO feature stopped.");  // Log the stopping of the feature
    }
}












const badWords = [
    "ꦾ", "~@0~*", "ꦽ", "᬴", ".@@", "@@@", "\u0000", "ြ", "ી", 
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
    let { key } = await conn.sendMessage(from, { text: '*◆─〈 ✦𝐃𝐢𝐝𝐮𝐥𝐚 𝐌𝐃 𝐕𝟐✦ 〉─◆*' });

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
        const message = await conn.sendMessage(from, { text: '*◆─〈 ✦𝐃𝐢𝐝𝐮𝐥𝐚 𝐌𝐃 𝐕𝟐✦ 〉─◆*' });

        // Simulate some processing time
        const startTime = Date.now();
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulating a delay
        const endTime = Date.now();
        const ping = endTime - startTime;

        // Send the alive response with additional information
        await conn.sendMessage(from, {
            document: { url: pdfUrl }, // Path to your PDF file
            fileName: '〈 ✦𝐃𝐢𝐝𝐮𝐥𝐚 𝐌𝐃 𝐕𝟐✦ 〉', // Filename for the document
            mimetype: "application/pdf",
            fileLength: 99999999999999,
            image: { url: 'https://i.ibb.co/tC37Q7B/20241220-122443.jpg' },
            pageCount: 2024,
            caption: `𝗗𝗶𝗱𝘂𝗹𝗮 𝗠𝗗 𝗩𝟮 𝗜𝘀 𝗔𝗹𝗶𝘃𝗲! \n\n⏰ 𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲 𝗧𝗶𝗺𝗲 : ${ping} ms\n\n𝗧𝘆𝗽𝗲   .𝗺𝗲𝗻𝘂 𝗼𝗿 .𝗹𝗶𝘀𝘁 𝗳𝗼𝗿 𝗴𝗲𝘁 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀\n\n〈 ✦𝐃𝐢𝐝𝐮𝐥𝐚 𝐌𝐃 𝐕𝟐✦ 〉`,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterName: '〈 ✦𝐃𝐢𝐝𝐮𝐥𝐚 𝐌𝐃 𝐕𝟐✦ 〉',
                    newsletterJid: "120363343196447945@newsletter",
                },
                externalAdReply: {
                    title: '©〈 ✦𝐃𝐢𝐝𝐮𝐥𝐚 𝐌𝐃 𝐕𝟐✦ 〉',
                    body: ' *〈 ✦𝐃𝐢𝐝𝐮𝐥𝐚 𝐌𝐃 𝐕𝟐✦ 〉*',
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
*├* *MAINMENU*
*├* *SEARCHD‎MENU*
*├* *GROUPMENU*
*├* *OWNERMENU*
*├* *DOWNLOAD‎MENU*
*├* *CONVERTMENU*
*├* *OTHERMENU*
*╰┈───────────────•*

> 🔱 *OWNER - Didula Rashmika*
> ‼️ *HELP DEV - Cyber Janiya*
> 📥 *CONTACT - 94771820962*
`;

        // Send the alive response with the updated menu
        await conn.sendMessage(from, {
            document: { url: pdfUrl },
            fileName: '*◆─〈 ✦𝐃𝐢𝐝𝐮𝐥𝐚 𝐌𝐃 𝐕𝟐✦ 〉─◆*',
            mimetype: "application/pdf",
            fileLength: 99999999999999,
            image: { url: 'https://i.ibb.co/tC37Q7B/20241220-122443.jpg' },
            pageCount: 2024,
            caption: menuMessage,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterName: '*◆─〈 ✦𝐃𝐢𝐝𝐮𝐥𝐚 𝐌𝐃 𝐕𝟐✦ 〉─◆*',
                    newsletterJid: "120363343196447945@newsletter",
                },
                externalAdReply: {
                    title: '*◆─〈 ✦𝐃𝐢𝐝𝐮𝐥𝐚 𝐌𝐃 𝐕𝟐✦ 〉─◆*',
                    body: '*◆─〈 ✦𝐃𝐢𝐝𝐮𝐥𝐚 𝐌𝐃 𝐕𝟐✦ 〉─◆*',
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