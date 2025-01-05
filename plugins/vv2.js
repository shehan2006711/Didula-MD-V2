
const { cmd, commands } = require('../command');
const config = require('../config');

cmd({
    pattern: "vv2",
    react: "👀",
    alias: ["rvo"],
    dontAddCommandList: true,
    use: '.vv',
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let quotedMessage = m.msg.contextInfo?.quotedMessage;

        // Check if the quoted message is a view-once message
        if (quotedMessage && quotedMessage.viewOnceMessageV2) {
            const viewOnceMessage = quotedMessage.viewOnceMessageV2;

            if (viewOnceMessage.message.imageMessage) {
                console.log("Quot Entered");
                let cap = viewOnceMessage.message.imageMessage.caption;
                let media = await conn.downloadAndSaveMediaMessage(viewOnceMessage.message.imageMessage);
                return conn.sendMessage(m.chat, { image: { url: media }, caption: cap });
            }

            if (viewOnceMessage.message.videoMessage) {
                console.log("Quot Entered");
                let cap = viewOnceMessage.message.videoMessage.caption;
                let media = await conn.downloadAndSaveMediaMessage(viewOnceMessage.message.videoMessage);
                return conn.sendMessage(m.chat, { video: { url: media }, caption: cap });
            }
        }

        // If no quoted message is found
        if (!quoted) return m.reply("```Uh, Please reply to a view-once message```");

        // Check if the quoted message is of type 'viewOnceMessage'
        if (quoted.mtype === "viewOnceMessage") {
            console.log("ViewOnce Entered");

            if (quoted.message.imageMessage) {
                let cap = quoted.message.imageMessage.caption;
                let media = await conn.downloadAndSaveMediaMessage(quoted.message.imageMessage);
                return conn.sendMessage(m.chat, { image: { url: media }, caption: cap });
            } else if (quoted.message.videoMessage) {
                let cap = quoted.message.videoMessage.caption;
                let media = await conn.downloadAndSaveMediaMessage(quoted.message.videoMessage);
                return conn.sendMessage(m.chat, { video: { url: media }, caption: cap });
            }
        } else {
            return m.reply("```This is not a view-once message```");
        }
    } catch (e) {
        console.error("Error in .vv command:", e);
        m.reply("```An error occurred while processing your request.```");
    }
});
