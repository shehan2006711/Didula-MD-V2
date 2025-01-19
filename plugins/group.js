
const { cmd } = require('../command'); // Ensure the path is correct
const { jsonformat } = require('../lib/functions');

cmd({
    pattern: "mute",
    react: "🔕",
    desc: "Close a group",
    category: "group",
    use: '.mute',
    filename: __filename
}, async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in groups.');
        if (!isBotAdmins) return reply('Bot must be an admin to use this command.');
        if (!isAdmins) return reply('You must be an admin to use this command.');

        await conn.groupSettingUpdate(from, 'announcement');
        reply('Group has been muted. Only admins can send messages now.');
    } catch (e) {
        reply('An error occurred while muting the group.');
        console.error(e);
    }
});

cmd({
    pattern: "unmute",
    react: "🔊",
    desc: "Open a group",
    category: "group",
    use: '.unmute',
    filename: __filename
}, async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in groups.');
        if (!isBotAdmins) return reply('Bot must be an admin to use this command.');
        if (!isAdmins) return reply('You must be an admin to use this command.');

        await conn.groupSettingUpdate(from, 'not_announcement');
        reply('Group has been unmuted. All members can send messages now.');
    } catch (e) {
        reply('An error occurred while unmuting the group.');
        console.error(e);
    }
});

cmd({
    pattern: "promote",
    react: "📈",
    desc: "Promote a member to admin",
    category: "group",
    use: '.promote @user',
    filename: __filename
}, async (conn, mek, m, { from, quoted, isGroup, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in groups.');
        if (!isBotAdmins) return reply('Bot must be an admin to use this command.');
        if (!isAdmins) return reply('You must be an admin to use this command.');

        let users = m.mentionedJid ? m.mentionedJid : quoted ? quoted.sender : null;
        if (!users) return reply('Please mention a user to promote.');

        await conn.groupParticipantsUpdate(from, [users], 'promote');
        reply(`Successfully promoted @${users.split('@')[0]} to admin.`, { mentions: [users] });
    } catch (e) {
        reply('An error occurred while promoting the member.');
        console.error(e);
    }
});

cmd({
    pattern: "demote",
    react: "📉",
    desc: "Demote an admin to member",
    category: "group",
    use: '.demote @user',
    filename: __filename
}, async (conn, mek, m, { from, quoted, isGroup, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in groups.');
        if (!isBotAdmins) return reply('Bot must be an admin to use this command.');
        if (!isAdmins) return reply('You must be an admin to use this command.');

        let users = m.mentionedJid ? m.mentionedJid : quoted ? quoted.sender : null;
        if (!users) return reply('Please mention a user to demote.');

        await conn.groupParticipantsUpdate(from, [users], 'demote');
        reply(`Successfully demoted @${users.split('@')[0]} to member.`, { mentions: [users] });
    } catch (e) {
        reply('An error occurred while demoting the member.');
        console.error(e);
    }
});

cmd({
    pattern: "kick",
    react: "🚫",
    desc: "Kick a member from the group",
    category: "group",
    use: '.kick @user',
    filename: __filename
}, async (conn, mek, m, { from, quoted, isGroup, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in groups.');
        if (!isBotAdmins) return reply('Bot must be an admin to use this command.');
        if (!isAdmins) return reply('You must be an admin to use this command.');

        let users = m.mentionedJid ? m.mentionedJid : quoted ? quoted.sender : null;
        if (!users) return reply('Please mention a user to kick.');

        await conn.groupParticipantsUpdate(from, [users], 'remove');
        reply(`Successfully kicked @${users.split('@')[0]} from the group.`, { mentions: [users] });
    } catch (e) {
        reply('An error occurred while kicking the member.');
        console.error(e);
    }
});

cmd({
    pattern: "getpic",
    desc: "Get the group profile picture",
    category: "group",
    react: "🖼️",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in groups.');

        const groupPic = await conn.getProfilePicture(from);
        await conn.sendMessage(from, { image: { url: groupPic }, caption: 'Group Profile Picture' });
    } catch (e) {
        console.error(e);
        reply('An error occurred while fetching the group picture.');
    }
});

cmd({
    pattern: "groupinfo",
    desc: "Get information about the group",
    category: "group",
    react: "ℹ️",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, groupMetadata, reply }) => {
    try {
        if (!isGroup) return reply('This command can only be used in groups.');

        const groupInfo = `*Group Information:*\n\n` +
            `👥 Name: ${groupMetadata.subject}\n` +
            `📝 Description: ${groupMetadata.desc || 'No description'}\n` +
            `🆔 ID: ${from}\n` +
            `👑 Owner: ${groupMetadata.owner || 'Not available'}\n` +
            `👤 Members: ${groupMetadata.participants.length}\n` +
            `👮 Admins: ${groupMetadata.participants.filter(p => p.admin).length}\n` +
            `📅 Created: ${new Date(groupMetadata.creation * 1000).toLocaleString()}\n`;

        reply(groupInfo);
    } catch (e) {
        console.error(e);
        reply('An error occurred while fetching group info.');
    }
});