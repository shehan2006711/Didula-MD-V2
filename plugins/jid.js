const { cmd } = require('../command');
const { exec } = require('child_process');
const config = require('../config');

// 4. Block User
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

// 5. Unblock User
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

// 6. Clear All Chats
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

cmd({
  pattern: "jid",
  desc: "get jid of all user in a group.",
  category: "main",
  filename: __filename,
  use: "<@user>",
 }, async ({ jid, reply, quoted }) => {
  if (quoted) {
    return reply(quoted.sender);
  } else {
    return reply(jid);
  }
 });

 // Get Profile Picture Command
 cmd({
  pattern: "getpp",
  desc: "Get Profile Pic For Given User",
  category: "owner",
  filename: __filename,
 }, async (message) => {
  try {
    const user = message.reply_message
      ? message.reply_message.sender
      : message.mentionedJid[0]
      ? message.mentionedJid[0]
      : message.from;

    let profilePicUrl;
    try {
      profilePicUrl = await message.bot.profilePictureUrl(user, "image");
    } catch (error) {
      return message.reply("```Profile Pic Not Fetched```");
    }

    return await message.bot.sendMessage(
      message.chat,
      {
        image: {
          url: profilePicUrl,
        },
        caption: "  *---Profile Pic Is Here---*\n" + Config.caption,
      },
      {
        quoted: message,
      }
    );
  } catch (error) {
    await message.error(error + "\n\ncommand : getpp", error);
  }
 });

 // Get User Information Command
 cmd({
  pattern: "whois",
  desc: "Makes photo of replied sticker.",
  category: "owner",
  use: "<reply to any person>",
  filename: __filename,
 }, async (message) => {
  try {
    const user = message.reply_message
      ? message.reply_message.sender
      : message.mentionedJid[0]
      ? message.mentionedJid[0]
      : false;

    if (!user && message.isGroup) {
      const groupPicUrl =
        (await message.bot
          .profilePictureUrl(message.chat, "image")
          .catch(() => "https://telegra.ph/file/29a8c892a1d18fdb26028.jpg")) ||
        THUMB_IMAGE;

      const metadata = message.metadata;
      const admins = message.admins
        .map(
          (admin, index) =>
            `  ${index + 1}. wa.me/${admin.id.split("@")[0]}`
        )
        .join("\n");

      const owner =
        metadata.owner ||
        message.admins.find((admin) => admin.admin === "superadmin")?.id ||
        false;

      let groupInfo =
        "\n      *「 GROUP INFORMATION 」*\n*▢ NAME :* \n   • " +
        metadata.subject +
        "\n*▢ Members :*\n   • " +
        metadata.participants.length +
        "\n*▢ Group Owner :*\n   • " +
        (owner ? "wa.me/" + owner.split("@")[0] : "notFound") +
        "\n*▢ Admins :*\n" +
        admins +
        "\n*▢ Description :*\n   • " +
        (metadata.desc?.toString() || "_not set_") +
        "\n   ";

      return await message.reply(
        groupPicUrl,
        {
          caption: groupInfo,
        },
        "image"
      );
    } else {
      if (!user) {
        return message.reply("*_Please Reply To A Person!_*");
      }

      try {
        const status = await message.bot.fetchStatus(user);
        const statusText = status.status;
        let statusTimestamp = status.setAt.toString();
        let timestampArray = statusTimestamp.split(" ");

        if (timestampArray.length > 3) {
          statusTimestamp = timestampArray.slice(0, 5).join(" ");
        }
      } catch {
        statusText = "undefined";
        statusTimestamp = "";
      }

      const userId = user.split("@")[0];
      let profilePicUrl;

      try {
        profilePicUrl = await message.bot.profilePictureUrl(user, "image");
      } catch (error) {
        profilePicUrl = "https://telegra.ph/file/29a8c892a1d18fdb26028.jpg";
      }

      const userName = await message.bot.getName(user);

      return await message.bot.sendMessage(
        message.jid,
        {
          image: {
            url: profilePicUrl,
          },
          caption: Config.ownername,
        },
        {
          quoted: message,
        }
      );
    }
  } catch (error) {
    await message.error(error + "\n\ncommand : whois", error);
  }
 });

 // Get WhatsApp Link Command
 cmd({
  pattern: "wa",
  desc: "Makes wa me of quoted or mentioned user.",
  category: "main",
  filename: __filename,
 }, async (message) => {
  try {
    const user = message.reply_message
      ? message.reply_message.sender
      : message.mentionedJid[0]
      ? message.mentionedJid[0]
      : false;

    await message.reply(
      !user
        ? "*Please Reply Or Mention A User*"
        : "https://wa.me/" + user.split("@")[0]
    );
  } catch (error) {
    await message.error(error + "\n\ncommand : wa", error, false);
  }
 });

 // Get User's WhatsApp Link Command
 cmd({
  pattern: "mee",
  desc: "Makes wa me for user.",
  category: "owner",
  filename: __filename,
 }, async (message) => {
  try {
    return await message.reply(
      "https://wa.me/" + message.sender.split("@")[0]
    );
  } catch {}
 });