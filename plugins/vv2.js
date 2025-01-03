
const axios = require('axios');
const { sck1, tiny, fancytext, listall, cmd, ffmpeg } = require('../lib/');
const fs = require('fs-extra');
const { exec } = require('child_process');
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");



//---------------------------------------------------------------------------

cmd({
  pattern: "toimg",
  alias: ["photo"],
  react: "🃏",
  desc: "Makes a photo of the replied sticker.",
  category: "converter",
  use: '<reply to any gif>',
  filename: __filename
},
async (Void, citel, text) => {
  // Check if the command is being used in a group chat
  if (citel.isGroup) {
    const getRandom = (ext) => {
      return `${Math.floor(Math.random() * 10000)}${ext}`;
    };

    if (!citel.quoted) return citel.reply(`_Reply to any sticker._`);
    let mime = citel.quoted.mtype;
    if (mime == "imageMessage" || mime == "stickerMessage") {
      let media = await Void.downloadAndSaveMediaMessage(citel.quoted);
      let name = await getRandom('.png');
      exec(`ffmpeg -i ${media} ${name}`, (err) => {
        let buffer = fs.readFileSync(media);
        Void.sendMessage(citel.chat, { image: buffer }, { quoted: citel });

        fs.unlink(media, (err) => {
          if (err) {
            return console.error('File not deleted from TOPHOTO at:', media, '\nwhile Error:', err);
          } else {
            return console.log('File deleted successfully in TOPHOTO at:', media);
          }
        });
      });
    } else {
      return citel.reply("```Uhh Please, reply to a non-animated sticker.```");
    }
  } else {
    return citel.reply(`⚠️WARNING⚠️*
  
_Don't text the Bot in pm._

*㊙️If you want to add this bot in your GC(GroupChat) then ask the Developer*

*〽️Developer:*
• https://wa.me/+917086726371

*📛Our official Support GC: https://chat.whatsapp.com/J66CTiDheI94vkxx6nIyp2*

*💗Have a nice day💗*

Kiyumi👘 Powered by:_ *©️TIKU_BOTS*`);
  }
});

//---------------------------------------------------------------------------

cmd({
  pattern: "vv2",
  alias: ['viewonce', 'retrive'],
  react: "🎭",
  desc: "Flips given text.",
  category: "misc",
  use: '<query>',
  filename: __filename
},
async (Void, citel, text) => {
  // Check if the command is being used in a group chat
  if (citel.isGroup) {
    try {
      const quot = citel.msg.contextInfo.quotedMessage.viewOnceMessageV2;
      if (quot) {
        if (quot.message.imageMessage) {
          let cap = quot.message.imageMessage.caption;
          let anu = await Void.downloadAndSaveMediaMessage(quot.message.imageMessage);
          return Void.sendMessage(citel.chat, { image: { url: anu }, caption: cap });
        }
        if (quot.message.videoMessage) {
          let cap = quot.message.videoMessage.caption;
          let anu = await Void.downloadAndSaveMediaMessage(quot.message.videoMessage);
          return Void.sendMessage(citel.chat, { video: { url: anu }, caption: cap });
        }
      }
    } catch (e) {
      console.log("error", e);
    }
  } else {
    return citel.reply(`*⚠️WARNING⚠️*
  
_Don't text the Bot in pm._

*㊙️If you want to add this bot in your GC(GroupChat) then ask the Developer*

*〽️Developer:*
• https://wa.me/+917086726371

*📛Our official Support GC: https://chat.whatsapp.com/J66CTiDheI94vkxx6nIyp2*

*💗Have a nice day💗*

Kiyumi👘 Powered by:_ *©️TIKU_BOTS*`);
  }

  if (!citel.quoted) return citel.reply("```Uh Please Reply A ViewOnce Message```");
  if (citel.quoted.mtype === "viewOnceMessage") {
    console.log("ViewOnce Entered");
    if (citel.quoted.message.imageMessage) {
      let cap = citel.quoted.message.imageMessage.caption;
      let anu = await Void.downloadAndSaveMediaMessage(citel.quoted.message.imageMessage);
      Void.sendMessage(citel.chat, { image: { url: anu }, caption: cap });
    } else if (citel.quoted.message.videoMessage) {
      let cap = citel.quoted.message.videoMessage.caption;
      let anu = await Void.downloadAndSaveMediaMessage(citel.quoted.message.videoMessage);
      Void.sendMessage(citel.chat, { video: { url: anu }, caption: cap });
    }
  } else {
    return citel.reply("```This is Not A ViewOnce Message```");
  }
});
