const {
  default: makeWASocket,
  getAggregateVotesInPollMessage,
  useMultiFileAuthState,
  DisconnectReason,
  getDevice,
  fetchLatestBaileysVersion,
  jidNormalizedUser,
  getContentType,
  Browsers,
  makeInMemoryStore,
  makeCacheableSignalKeyStore,
  downloadContentFromMessage,
  generateWAMessageFromContent,
  prepareWAMessageMedia,
  generateForwardMessageContent,
  proto,
} = require("@whiskeysockets/baileys");
const FileType = require("file-type");
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('./lib/functions')
const fs = require('fs')
const P = require('pino')
const config = require('./config')
const qrcode = require('qrcode-terminal')
const util = require('util')
const { sms,downloadMediaMessage } = require('./lib/msg')
const axios = require('axios')
const { File } = require('megajs')
const prefix = '.'

const ownerNumber = ['94771820962']

//===================SESSION-AUTH============================
if (!fs.existsSync(__dirname + '/auth_info_baileys/creds.json')) {
if(!config.SESSION_ID) return console.log('Please add your session to SESSION_ID env !!')
const sessdata = config.SESSION_ID
const filer = File.fromURL(`https://mega.nz/file/${sessdata}`)
filer.download((err, data) => {
if(err) throw err
fs.writeFile(__dirname + '/auth_info_baileys/creds.json', data, () => {
console.log("Didula MD V2 💚 Session downloaded ✅")
})})}

const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

//=============================================

async function connectToWA() {
console.log("Didula MD V2 💚 Connecting wa bot 🧬...");
const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys/')
var { version } = await fetchLatestBaileysVersion()

const conn = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: false,
        browser: Browsers.macOS("Firefox"),
        syncFullHistory: true,
        auth: state,
        version
        })

conn.ev.on('connection.update', (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
connectToWA()
}
} else if (connection === 'open') {
console.log('Didula MD V2 💚 😼 Installing... ')
const path = require('path');
fs.readdirSync("./plugins/").forEach((plugin) => {
if (path.extname(plugin).toLowerCase() == ".js") {
require("./plugins/" + plugin);
}
});
console.log('Didula MD V2 💚 Plugins installed successful ✅')
console.log('Didula MD V2 💚Bot connected to whatsapp ✅')

let up = `Didula MD V2 💚 Wa-BOT connected successful ✅\n\nPREFIX: ${prefix}`;

conn.sendMessage(ownerNumber + "@s.whatsapp.net", { image: { url: `https://i.ibb.co/tC37Q7B/20241220-122443.jpg` }, caption: up })

}
})
conn.ev.on('creds.update', saveCreds)  

conn.ev.on('messages.upsert', async(mek) => {
mek = mek.messages[0]
if (!mek.message) return        
mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
      if (mek.key && mek.key.remoteJid === 'status@broadcast') {
            if (config.AUTO_READ_STATUS === 'true') {
                await conn.readMessages([mek.key]);
            }

            if (config.AUTO_STATUS_REPLY === 'true' && !mek.key.fromMe) {
                const replyMsg = config.STATUS_READ_MSG || '🌟 Nice status!';
                
                await conn.sendMessage(mek.key.remoteJid, { text: replyMsg });
                
                await conn.sendMessage(mek.key.remoteJid, {
                    react: {
                        text: "🫂",
                        key: mek.key
                    }
                });
            }
            return;
        }

        // Anti Delete System
        if (!mek.key.id.startsWith("BAE5")) {
            // Initialize storage
            if (!fs.existsSync("message_data")) {
                fs.mkdirSync("message_data");
            }

            // Message handling functions
            const messageHandler = {
                readMessageData: function(chatId, messageId) {
                    const filePath = path.join("message_data", chatId, messageId + ".json");
                    try {
                        const data = fs.readFileSync(filePath, "utf8");
                        return JSON.parse(data) || [];
                    } catch (err) {
                        return [];
                    }
                },

                saveMessageData: function(chatId, messageId, data) {
                    const dirPath = path.join("message_data", chatId);
                    if (!fs.existsSync(dirPath)) {
                        fs.mkdirSync(dirPath, { recursive: true });
                    }
                    const filePath = path.join(dirPath, messageId + ".json");
                    try {
                        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
                    } catch (err) {
                        console.error("Error saving chat data:", err);
                    }
                },

                saveMessage: function(message) {
                    const messageId = message.key.id;
                    const messages = this.readMessageData(chat.id, messageId);
                    messages.push(message);
                    this.saveMessageData(chat.id, messageId, messages);
                },

                handleDeletedMessage: async function(info) {
                    const messageId = info.msg.key.id;
                    const messages = this.readMessageData(chat.id, messageId);
                    const originalMsg = messages[0];

                    if (!originalMsg) {
                        console.log("Original message not found");
                        return;
                    }

                    const notifyChat = config.DELETEMSGSENDTO !== '' ? 
                        config.DELETEMSGSENDTO + "@s.whatsapp.net" : chat.id;

                    const deletedBy = info.sender.split('@')[0];
                    const originalSender = (originalMsg.key.participant ?? info.sender).split('@')[0];

                    // Skip bot messages
                    if (deletedBy.includes(botNumber) || originalSender.includes(botNumber)) {
                        return;
                    }

                    // Handle different message types
                    if (originalMsg.message) {
                        // Text messages
                        if (originalMsg.message.conversation) {
                            const text = originalMsg.message.conversation;
                            if (antiLink && text.includes("chat.whatsapp.com")) return;

                            await conn.sendMessage(notifyChat, {
                                text: `🚫 *This message was deleted !!*\n\n` +
                                     `🚮 *Deleted by:* _${deletedBy}_\n` +
                                     `📩 *Sent by:* _${originalSender}_\n\n` +
                                     `> 🔓 Message Text: \`\`\`${text}\`\`\``
                            });
                        }
                        // Image messages
                        else if (originalMsg.message.imageMessage) {
                            const caption = originalMsg.message.imageMessage.caption || '';
                            if (antiLink && caption.includes("chat.whatsapp.com")) return;

                            const image = await this.downloadMedia(originalMsg, 'image');
                            await conn.sendMessage(notifyChat, {
                                image: image,
                                caption: `🚫 *This message was deleted !!*\n\n` +
                                        `🚮 *Deleted by:* _${deletedBy}_\n` +
                                        `📩 *Sent by:* _${originalSender}_\n\n` +
                                        (caption ? `> 🔓 Caption: ${caption}` : '')
                            });
                        }
                        // Video messages
                        else if (originalMsg.message.videoMessage) {
                            const caption = originalMsg.message.videoMessage.caption || '';
                            if (antiLink && caption.includes("chat.whatsapp.com")) return;

                            const fileSize = originalMsg.message.videoMessage.fileLength;
                            const duration = originalMsg.message.videoMessage.seconds;

                            if (fileSize/1048576 < config.MAX_SIZE && duration < 1800) {
                                const video = await this.downloadMedia(originalMsg, 'video');
                                await conn.sendMessage(notifyChat, {
                                    video: video,
                                    caption: `🚫 *This message was deleted !!*\n\n` +
                                            `🚮 *Deleted by:* _${deletedBy}_\n` +
                                            `📩 *Sent by:* _${originalSender}_\n\n` +
                                            (caption ? `> 🔓 Caption: ${caption}` : '')
                                });
                            }
                        }
                        // Document messages
                        else if (originalMsg.message.documentMessage) {
                            const doc = await this.downloadMedia(originalMsg, 'document');
                            await conn.sendMessage(notifyChat, {
                                document: doc,
                                mimetype: originalMsg.message.documentMessage.mimetype,
                                fileName: originalMsg.message.documentMessage.fileName,
                                caption: `🚫 *This message was deleted !!*\n\n` +
                                        `🚮 *Deleted by:* _${deletedBy}_\n` +
                                        `📩 *Sent by:* _${originalSender}_\n`
                            });
                        }
                        // Audio messages
                        else if (originalMsg.message.audioMessage) {
                            const audio = await this.downloadMedia(originalMsg, 'audio');
                            const msg = await conn.sendMessage(notifyChat, {
                                audio: audio,
                                mimetype: originalMsg.message.audioMessage.mimetype,
                                ptt: originalMsg.message.audioMessage.ptt || false,
                                fileName: mek.key.id + ".mp3"
                            });

                            await conn.sendMessage(notifyChat, {
                                text: `🚫 *This message was deleted !!*\n\n` +
                                      `🚮 *Deleted by:* _${deletedBy}_\n` +
                                      `📩 *Sent by:* _${originalSender}_\n`
                            }, { quoted: msg });
                        }
                        // Sticker messages
                        else if (originalMsg.message.stickerMessage) {
                            const sticker = await this.downloadMedia(originalMsg, 'sticker');
                            const msg = await conn.sendMessage(notifyChat, {
                                sticker: sticker,
                                package: "Anti-Delete System"
                            });

                            await conn.sendMessage(notifyChat, {
                                text: `🚫 *This message was deleted !!*\n\n` +
                                      `🚮 *Deleted by:* _${deletedBy}_\n` +
                                      `📩 *Sent by:* _${originalSender}_\n`
                            }, { quoted: msg });
                        }
                    }
                },

                downloadMedia: async function(message, type) {
                    const fileName = getRandom('');
                    const stream = await downloadContentFromMessage(
                        message.message[type + 'Message'],
                        type
                    );
                    let buffer = Buffer.from([]);
                    for await (const chunk of stream) {
                        buffer = Buffer.concat([buffer, chunk]);
                    }
                    await fs.promises.writeFile(fileName, buffer);
                    return fs.readFileSync(fileName);
                }
            };








const m = sms(conn, mek)
const type = getContentType(mek.message)
const content = JSON.stringify(mek.message)
const from = mek.key.remoteJid

// Always send 'composing' presence update
await conn.sendPresenceUpdate('composing', from);

// Always send 'recording' presence update
await conn.sendPresenceUpdate('recording', from);

const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''
const isCmd = body.startsWith(prefix)
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
const args = body.trim().split(/ +/).slice(1)
const q = args.join(' ')
const isGroup = from.endsWith('@g.us')
const sender = mek.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
const senderNumber = sender.split('@')[0]
const botNumber = conn.user.id.split(':')[0]
const pushname = mek.pushName || 'Sin Nombre'
const isMe = botNumber.includes(senderNumber)
const isOwner = ownerNumber.includes(senderNumber) || isMe
const botNumber2 = await jidNormalizedUser(conn.user.id);
const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(e => {}) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false
const isAdmins = isGroup ? groupAdmins.includes(sender) : false
const reply = (teks) => {
conn.sendMessage(from, { text: teks }, { quoted: mek })
}

conn.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
              let mime = '';
              let res = await axios.head(url)
              mime = res.headers['content-type']
              if (mime.split("/")[1] === "gif") {
                return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options }, { quoted: quoted, ...options })
              }
              let type = mime.split("/")[0] + "Message"
              if (mime === "application/pdf") {
                return conn.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options }, { quoted: quoted, ...options })
              }
              if (mime.split("/")[0] === "image") {
                return conn.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options }, { quoted: quoted, ...options })
              }
              if (mime.split("/")[0] === "video") {
                return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options }, { quoted: quoted, ...options })
              }
              if (mime.split("/")[0] === "audio") {
                return conn.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options }, { quoted: quoted, ...options })
              }
            }

//============================for rvo================================================
      conn.downloadAndSaveMediaMessage = async (
        message,
        filename,
        attachExtension = true
      ) => {
        let quoted = message.msg ? message.msg : message;
        let mime = (message.msg || message).mimetype || "";
        let messageType = message.mtype
          ? message.mtype.replace(/Message/gi, "")
          : mime.split("/")[0];
        const stream = await downloadContentFromMessage(quoted, messageType);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk]);
        }
        let type = await FileType.fromBuffer(buffer);
        trueFileName = attachExtension ? filename + "." + type.ext : filename;
        // save to file
        await fs.writeFileSync(trueFileName, buffer);
        return trueFileName;
      };

// Always set the bot's presence status to 'unavailable'
conn.sendPresenceUpdate('unavailable'); // Sets the bot's last seen status





const events = require('./command')
const cmdName = isCmd ? body.slice(1).trim().split(" ")[0].toLowerCase() : false;
if (isCmd) {
const cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
if (cmd) {
if (cmd.react) conn.sendMessage(from, { react: { text: cmd.react, key: mek.key }})

try {
cmd.function(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply});
} catch (e) {
console.error("[PLUGIN ERROR] " + e);
}
}
}
events.commands.map(async(command) => {
if (body && command.on === "body") {
command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
} else if (mek.q && command.on === "text") {
command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
} else if (
(command.on === "image" || command.on === "photo") &&
mek.type === "imageMessage"
) {
command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
} else if (
command.on === "sticker" &&
mek.type === "stickerMessage"
) {
command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
}});


//============================================================================ 

})
}
app.get("/", (req, res) => {
res.send("hey, bot started✅");
});
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
setTimeout(() => {
connectToWA()
}, 4000);  
