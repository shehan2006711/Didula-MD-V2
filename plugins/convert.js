
const { cmd } = require('../command'); // Ensure the path is correct
const si = require('systeminformation'); // Import systeminformation for system data
const { jsonformat } = require('../lib/functions'); // Import jsonformat for structured JSON output

// Ping Command
cmd({
    pattern: "ping",
    alias: ["pong"],
    react: "🏓",
    desc: "Check the bot's responsiveness",
    category: "utility",
    use: '.ping',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    const start = Date.now();
    await reply('🏓 Ping is in progress...');
    const end = Date.now();
    const latency = end - start; // Calculate the latency
    await reply(`🏓 Pong! Latency: ${latency} ms`);
});

// System Information Command
cmd({
    pattern: "sysinfo",
    alias: ["system"],
    react: "🖥️",
    desc: "Get system information",
    category: "main",
    use: '.sysinfo',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
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

// Clear Chats Command
cmd({
    pattern: "clearchats",
    desc: "Clear all chats from the bot",
    category: "owner",
    react: "🧹",
    filename: __filename
}, async (conn, mek, m, { from, isOwner, reply }) => {
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

// Block User Command
cmd({
    pattern: "block",
    desc: "Block a user",
    category: "owner",
    react: "🚫",
    filename: __filename
}, async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ Owner command!");
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
    desc: "Unblock a user",
    category: "owner",
    react: "✅",
    filename: __filename
}, async (conn, mek, m, { from, isOwner, quoted, reply }) => {
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

// Restart Command
cmd({
    pattern: "restart",
    desc: "Restart the bot",
    category: "owner",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        reply("Didula MD V2 💚 restarting...");
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulating a delay
        const { exec } = require("child_process");
        exec("pm2 restart all");
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// Forward Command
cmd({
    pattern: "forward",
    desc: "Forward messages",
    alias: ['fo'],
    category: "owner",
    use: ".forward <Jid address>",
    filename: __filename
}, async (conn, mek, m, { from, quoted, q, isOwner, reply }) => {
    if (!isOwner) return reply("*You Are Not Owner Or Bot*");

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

// Other generic commands can be added here...
