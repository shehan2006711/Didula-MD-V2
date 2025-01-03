const { cmd } = require('../command');
const { Button } = require('@whiskeysockets/baileys'); // Import Button feature

const pdfUrl = "https://i.ibb.co/tC37Q7B/20241220-122443.jpg";

cmd({
    pattern: "menu5",
    desc: "Check commands.",
    category: "main",
    react: "✨",
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

        // Create buttons for different menu sections (using simple button objects)
        const buttons = [
            { buttonId: 'downloadmenu', buttonText: { displayText: 'Download Menu' }, type: 1 },
            { buttonId: 'mainmenu', buttonText: { displayText: 'Main Menu' }, type: 1 },
            { buttonId: 'groupmenu', buttonText: { displayText: 'Group Menu' }, type: 1 },
            { buttonId: 'ownermenu', buttonText: { displayText: 'Owner Menu' }, type: 1 },
            { buttonId: 'convertmenu', buttonText: { displayText: 'Convert Menu' }, type: 1 },
            { buttonId: 'searchmenu', buttonText: { displayText: 'Search Menu' }, type: 1 },
        ];

        const menuMessage = `
💚 *𝗗𝗶𝗱𝘂𝗹𝗮 𝗠𝗗 𝗠𝗲𝗻𝘂: 📥*

🔱 𝗢𝘄𝗻𝗲𝗿 - 𝗗𝗶𝗱𝘂𝗹𝗮 𝗥𝗮𝘀𝗵𝗺𝗶𝗸𝗮  
‼️ 𝗛𝗲𝗹𝗽 𝗗𝗲𝗩 - 𝗖𝘆𝗯𝗲𝗿 𝗝𝗮𝗻𝗶𝘆𝗮  
📥 𝗖𝗼𝗻𝘁𝗮𝗰𝘁 - 94771820962  

────────────────────  

✨ *𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱 𝗠𝗲𝗻𝘂:*  
📍➣ Command :  *.downloadmenu*  
📃➣ Desc : Download files from provided links.  

────────────────────  

✨ *𝗠𝗮𝗶𝗻 𝗠𝗲𝗻𝘂:*  
📍➣ Command :  *.mainmenu*  
📃➣ Desc : Get help with bot commands.  

────────────────────  

✨ *𝗚𝗿𝗼𝗨𝗽 𝗠𝗲𝗻𝘂:*  
📍➣ Command :  *.groupmenu*  
📃➣ Desc : Get information about the group.  

────────────────────  

✨ *𝗢𝘄𝗻𝗲𝗿 𝗠𝗲𝗻𝘂:*  
📍➣ Command :  *.ownermenu*  
📃➣ Desc : Set welcome message for new members.  

────────────────────  

✨ *𝗖𝗼𝗻𝘃𝗲𝗿𝘁 𝗠𝗲𝗻𝘂:*  
📍➣ Command :  *.convertmenu*  
📃➣ Desc : Convert files to different formats.  

────────────────────  

✨ *𝗦𝗲𝗮𝗿𝗰𝗵 𝗠𝗲𝗻𝘂:*  
📍➣ Command :  *.searchmenu*  
📃➣ Desc : Search for information online.  
`;

        // Send the alive response with the updated menu and buttons
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
            },
            buttons: buttons, // Add buttons
            headerType: 4 // Add image header
        });
    } catch (e) {
        console.error(e);
        reply(`${e}`);
    }
});
