
// main.js - All Main Category Commands

const { cmd, commands } = require('../command');
const config = require('../config');
const si = require('systeminformation');

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
    pattern: "menu",
    react: "📜",
    desc: "Show the menu with options",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from }) => {
    try {
        const menuMessage = `
✨ *𝑴𝒂𝒊𝒏 𝑴𝒆𝒏𝒖* ✨ 

🌟 Please select an option by replying with the corresponding number:

🟢 *1.* *Download Menu*  
🟢 *2.* *Main Menu*  
🟢 *3.* *Group Menu*  
🟢 *4.* *Owner Menu*  
🟢 *5.* *Convert Menu*  
🟢 *6.* *Search Menu*  
🟢 *7.* *Exit Menu*

🔔 *Your choice will help us serve you better!*
        `;
        await conn.sendMessage(from, { text: menuMessage }, { quoted: mek });
    } catch (e) {
        console.error("Error in sending menu:", e.message);
        await conn.sendMessage(from, { text: `An error occurred: ${e.message}` }, { quoted: mek });
    }
});

// Menu Selection Handler
conn.ev.on('messages.upsert', async (msgUpdate) => {
    const msg = msgUpdate.messages[0];
    if (!msg || !msg.message || !msg.message.extendedTextMessage) return;

    const { from, quoted, body, mek } = msg;

    // Check if the message is part of a menu response
    if (msg.message.extendedTextMessage.contextInfo && 
        msg.message.extendedTextMessage.contextInfo.stanzaId === mek.key.id) {

        const selectedOption = msg.message.extendedTextMessage.text.trim();

        let menu = '';
        commands.forEach(command => {
            if ((selectedOption === '1' && command.category === 'download') ||
                (selectedOption === '2' && command.category === 'main') ||
                (selectedOption === '3' && command.category === 'group') ||
                (selectedOption === '4' && command.category === 'owner') ||
                (selectedOption === '5' && command.category === 'convert') ||
                (selectedOption === '6' && command.category === 'search')) {
                menu += `*📍➣ Command :* ${command.pattern}\n*📃➣ Desc :* ${command.desc}\n*⌛➣ Use:* ${command.use || 'N/A'}\n\n`;
            }
        });

        if (menu) {
            let madeMenu = `💚 *𝗠𝗲𝗻𝘂:📥*\n\n${menu}────────────────────`;
            await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: madeMenu }, { quoted: mek });
        } else if (selectedOption === '7') {
            await conn.sendMessage(from, { text: 'Exiting the menu. Feel free to ask anything!' }, { quoted: mek });
        } else {
            await conn.sendMessage(from, { text: 'Invalid option. Please select a valid number.' }, { quoted: mek });
        }
    }
});


module.exports = {
    // Export any necessary functions or variables
};