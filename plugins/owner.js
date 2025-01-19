
// owner.js - All Owner Category Commands

const { cmd } = require('../command');
const config = require('../config');

// Block User Command
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

// Unblock User Command
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

// Clear All Chats Command
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

// Forward Message Command
cmd({
    pattern: "forward",
    desc: "Forward messages",
    alias: ['fo'],
    category: "owner",
    use: ".forward <Jid address>",
    filename: __filename
}, async (conn, mek, store, {
    from,
    quoted,
    q,
    isOwner,
    isMe,
    reply
}) => {
    if (!isOwner & !isMe) {
        return reply("*You Are Not Owner Or Bot*");
    }

    if (!q) {
        return reply("Please provide a target JID address ❌");
    }

    if (!quoted) {
        return reply("Please reply to a message you want to forward ❌");
    }

    const forwardMessage = quoted.fakeObj ? quoted.fakeObj : quoted;

    try {
        await conn.sendMessage(q, { forward: forwardMessage }, { quoted: mek });
        return reply(`*Message forwarded successfully to:*\n\n${q} ✅`);
    } catch (error) {
        console.error("Error forwarding message:", error);
        return reply("Failed to forward the message ❌");
    }
});

// Restart Bot Command
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
});

// JID Command
cmd({
    pattern: "jid",
    react: "💻",
    alias: ["jids"],
    desc: "Check bot's ping",
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
});

// Group JIDs List Command
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

// Kick All Command (Owner verification)
cmd({
    pattern: "kickall",
    desc: "Kicks all non-admin members from the group.",
    react: "👏",
    category: "owner",
    filename: __filename,
},           
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!isAdmins) return reply(`ɪ ɴᴇᴇᴅ ᴀᴅᴍɪɴ 💀`)
    if (!isOwner) return reply(`ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴏᴡɴᴇʀ ᴏꜰ ᴅɪᴅᴜʟᴀ ᴍᴅ`)

    if (!isGroup) return reply(`This command is only for groups.`);
    if (!isBotAdmins) return reply(`I need admin privileges to kick users.`);
    
    const allParticipants = groupMetadata.participants;
    const nonAdminParticipants = allParticipants.filter(member => !groupAdmins.includes(member.id));
    
    if (nonAdminParticipants.length === 0) {
        return reply('There are no non-admin members to kick.');
    }
    
    for (let participant of nonAdminParticipants) {
        await conn.groupParticipantsUpdate(m.chat, [participant.id], "remove");
    }
    
    reply(`Didula MD V2 💚 Successfully kicked all non-admin members from the group.`);

} catch (e) {
    console.error('Error kicking users:', e);
    reply('An error occurred while trying to kick all members. Please try again.');
}
});

module.exports = {
    // Export any necessary functions or variables
};