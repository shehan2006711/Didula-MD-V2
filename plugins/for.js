
const { cmd } = require('../command');

cmd({
    pattern: "fo",
    desc: "Forwards mentioned messages, videos, or audios to a specified user or group by JID.",
    react: "📤",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, isGroup, participants }) => {
    try {
        // Check if the command is used in a group
        
        // Check if there is a quote/message to forward
        if (!quoted) return reply(`Please mention a message, video, or audio to forward.`);

        // Get the JID of the user or group to forward the message to
        const targetJid = m.text.split(' ')[1]; // This assumes the JID is provided after the command

        // Validate the JID
        if (!targetJid) return reply(`Please provide a valid JID to forward the message.`);

        // Forward the quoted message to the target JID
        await conn.forwardMessage(targetJid, quoted);

        // Send a confirmation message
        reply(`Successfully forwarded the message to ${targetJid}.`);
    } catch (e) {
        console.error('Error forwarding message:', e);
        reply(`An error occurred while trying to forward the message. Please try again.`);
    }
});