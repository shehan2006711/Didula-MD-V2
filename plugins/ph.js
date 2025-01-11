
const { cmd } = require('../command'); // Ensure the path is correct
const { fetchJson } = require('../lib/functions'); // Ensure the path is correct

const apilink = 'https://www.dark-yasiya-api.site/'; // API LINK (DO NOT CHANGE THIS!!)

cmd({
    pattern: "phub",
    alias: ["phdl", "phdown"],
    react: "🔞",
    desc: "Download pornhub.com porn video",
    category: "download",
    use: '.phub <text>',
    filename: __filename
},
async (conn, mek, m, { from, quoted, reply, q }) => {
    try {
        if (!q) return await reply("𝖯𝗅𝖺𝗌𝖾 𝖦𝗂𝗏𝖾 𝗆𝖾 𝖥𝖾𝗐 𝖶𝗈𝗋𝖽!");

        // Search for videos on Pornhub
        const phub_list = await fetchJson(`${apilink}/search/phub?q=${q}`);
        if (phub_list.result.length < 1) return await reply("No results found!");

        // Get download link for the first video
        const phub_info = await fetchJson(`${apilink}/download/phub?url=${phub_list.result[0].url}`);

        // Prepare the message
        const msg = `
        *乂 Didula MD-V2 PORNHUB DOWNLOADER* 🔞

        • *𝖳𝗂𝗍𝗅𝗂𝖾* - ${phub_info.video_title}
        • *𝖵𝗂𝖾𝗐𝗌* - ${phub_info.video_views || 'N/A'}
        • *𝖴𝗽𝗹𝗼𝖺𝖽𝗲𝗋* - ${phub_info.video_uploader}
        • *𝖳𝗋𝗮𝖿𝗋𝗂𝖼* - ${phub_info.video_upload_date}
        • *𝖶𝗈𝗋𝖣* - ${phub_info.format.map(f => `${f.resolution}p`).join(', ')}

         *©ᴩʀᴏᴊᴇᴄᴛꜱ ᴏꜰ ᴅɪᴅᴜʟᴀ ʀᴀꜱʜᴍɪᴋᴀ*`;

        // Sending the message with details
        await conn.sendMessage(from, {
            text: msg,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterName: 'ᴩʀᴏᴊᴇᴄᴛꜱ ᴏꜰ ᴅɪᴅᴜʟᴀ ʀᴀꜱʜᴍɪᴋᴀ',
                    newsletterJid: "120363343196447945@newsletter",
                },
                externalAdReply: {
                    title: `Didula MD-V2 Pornhub Downloader`,
                    body: `Can't Find The Information. You Can Try Another Way. Error Code 4043`,
                    thumbnailUrl: phub_list.result[0].image,
                    sourceUrl: phub_info.original_url,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: mek });

        // Send available resolution options to user
        const downloadOptions = phub_info.format.map((f, index) => `${index + 1}. ${f.resolution}p`).join('\n');
        await reply(`*Choose a resolution to download:*\n${downloadOptions}\n\n*Reply with the number of your choice!*`);

        // Wait for user's response
        const filter = m => m.from === from && !m.quoted;
        const collected = await conn.awaitMessages(filter, { max: 1, time: 30000 });

        if (collected.size === 0) {
            return reply('No response received. Please try again.');
        }

        const choiceIndex = parseInt(collected.first().body) - 1;

        if (isNaN(choiceIndex) || choiceIndex < 0 || choiceIndex >= phub_info.format.length) {
            return reply('Invalid choice. Please enter a valid number.');
        }

        const downloadUrl = phub_info.format[choiceIndex].download_url;

        // Send the video to the user
        await conn.sendMessage(from, { video: { url: downloadUrl }, caption: phub_info.video_title }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply('An error occurred while processing your request. Please try again later.');
    }
});