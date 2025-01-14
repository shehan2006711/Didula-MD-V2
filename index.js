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
    // Automatically read the status message
    if (config.AUTO_READ_STATUS === 'true') {
        await conn.readMessages([mek.key]);
    }

    // Automatically reply to the status
    if (config.AUTO_STATUS_REPLY === 'true' && !mek.key.fromMe) {
        const replyMsg = config.STATUS_READ_MSG || '🌟 Nice status!';

        // Send a reply message
        await conn.sendMessage(mek.key.remoteJid, { text: replyMsg });

        // React to the status with a heart emoji
        await conn.sendMessage(mek.key.remoteJid, {
            react: {
                text: "🫂",
                key: mek.key
            }
        });
    }
    return; // Exit after handling status
}




// antideleted 


if (!_0x535a9e) {
       
          if (!_0x8fbd9a.id.startsWith("BAE5")) {
            if (!fs.existsSync("message_data")) {
              fs.mkdirSync("message_data");
            }
            function _0x2922d7(_0x5f2a81, _0x11c023) {
              const _0x156409 = path.join("message_data", _0x5f2a81, _0x11c023 + ".json");
              try {
                const _0x3491ea = fs.readFileSync(_0x156409, "utf8");
                return JSON.parse(_0x3491ea) || [];
              } catch (_0x5b24cf) {
                return [];
              }
            }
            function _0xc73718(_0x2cafd4, _0x47a421, _0x1ce721) {
              const _0x12789c = path.join("message_data", _0x2cafd4);
              if (!fs.existsSync(_0x12789c)) {
                const _0x48ee51 = {
                  recursive: true
                };
                fs.mkdirSync(_0x12789c, _0x48ee51);
              }
              const _0x49d39c = path.join(_0x12789c, _0x47a421 + ".json");
              try {
                fs.writeFileSync(_0x49d39c, JSON.stringify(_0x1ce721, null, 2));
              } catch (_0x3770c3) {
                console.error("Error saving chat data:", _0x3770c3);
              }
            }
            function _0x361068(_0x14338b) {
              const _0x49a8b9 = _0x14338b.key.id;
              const _0x2fa2db = _0x2922d7(_0x273ad8, _0x49a8b9);
              _0x2fa2db.push(_0x14338b);
              _0xc73718(_0x273ad8, _0x49a8b9, _0x2fa2db);
            }
            const _0x28b7c9 = config.DELETEMSGSENDTO !== '' ? config.DELETEMSGSENDTO + "@s.whatsapp.net" : _0x273ad8;
            function _0x2375da(_0x1c76f6) {
              const _0x1ca776 = _0x1c76f6.msg.key.id;
              const _0x17374f = _0x2922d7(_0x273ad8, _0x1ca776);
              const _0x46182b = _0x17374f[0];
              if (_0x46182b) {
                const _0x246b37 = _0x1c76f6.sender.split('@')[0];
                const _0x30b98c = _0x46182b.key.participant ?? _0x1c76f6.sender;
                const _0x149c96 = _0x30b98c.split('@')[0];
                if (_0x246b37.includes(_0x3fce54) || _0x149c96.includes(_0x3fce54)) {
                  return;
                }
                if (_0x46182b.message && _0x46182b.message.conversation && _0x46182b.message.conversation !== '') {
                  const _0x4a2b0b = _0x46182b.message.conversation;
                  if (_0x313f8b && _0x4a2b0b.includes("chat.whatsapp.com")) {
                    return;
                  }
                  var _0x1bd13e = "```";
                  const _0x304d37 = {
                    text: "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x246b37 + "_\n  📩 *Sent by:* _" + _0x149c96 + "_\n\n> 🔓 Message Text: " + _0x1bd13e + _0x4a2b0b + _0x1bd13e
                  };
                  _0x10ba11.sendMessage(_0x28b7c9, _0x304d37);
                } else {
                  if (_0x46182b.msg.type === "MESSAGE_EDIT") {
                    const _0x2f8e54 = {
                      text: "❌ *edited message detected* " + _0x46182b.message.editedMessage.message.protocolMessage.editedMessage.conversation
                    };
                    const _0x2382c2 = {
                      quoted: _0xac4c62
                    };
                    _0x10ba11.sendMessage(_0x28b7c9, _0x2f8e54, _0x2382c2);
                  } else {
                    if (_0x46182b.message && _0x46182b.message.exetendedTextMessage && _0x46182b.msg.text) {
                      const _0x8cca32 = _0x46182b.msg.text;
                      if (_0x313f8b && _0x8cca32.includes("chat.whatsapp.com")) {
                        return;
                      }
                      var _0x1bd13e = "```";
                      const _0x4c35c6 = {
                        text: "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x246b37 + "_\n  📩 *Sent by:* _" + _0x149c96 + "_\n\n> 🔓 Message Text: " + _0x1bd13e + _0x8cca32 + _0x1bd13e
                      };
                      _0x10ba11.sendMessage(_0x28b7c9, _0x4c35c6);
                    } else {
                      if (_0x46182b.message && _0x46182b.message.exetendedTextMessage) {
                        if (_0x313f8b && messageText.includes("chat.whatsapp.com")) {
                          return;
                        }
                        var _0x1bd13e = "```";
                        const _0x2087a4 = {
                          text: "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x246b37 + "_\n  📩 *Sent by:* _" + _0x149c96 + "_\n\n> 🔓 Message Text: " + _0x1bd13e + _0x46182b.body + _0x1bd13e
                        };
                        _0x10ba11.sendMessage(_0x28b7c9, _0x2087a4);
                      } else {
                        if (_0x46182b.type === "extendedTextMessage") {
                          async function _0x2660a0() {
                            if (_0x46182b.message.extendedTextMessage) {
                              if (_0x313f8b && messageText.includes("chat.whatsapp.com")) {
                                return;
                              }
                              const _0x38da5c = {
                                text: "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x246b37 + "_\n  📩 *Sent by:* _" + _0x149c96 + "_\n\n> 🔓 Message Text: " + "```" + _0x46182b.message.extendedTextMessage.text + "```"
                              };
                              _0x10ba11.sendMessage(_0x28b7c9, _0x38da5c);
                            } else {
                              if (_0x313f8b && messageText.includes("chat.whatsapp.com")) {
                                return;
                              }
                              const _0xbc5f28 = {
                                text: "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x246b37 + "_\n  📩 *Sent by:* _" + _0x149c96 + "_\n\n> 🔓 Message Text: " + "```" + _0x46182b.message.extendedTextMessage.text + "```"
                              };
                              _0x10ba11.sendMessage(_0x28b7c9, _0xbc5f28);
                            }
                          }
                          _0x2660a0();
                        } else {
                          if (_0x46182b.type === "imageMessage") {
                            async function _0x29a543() {
                              var _0x11207b = getRandom('');
                              const _0x4fdbb1 = sms(_0x10ba11, _0x46182b);
                              let _0x4e2b72 = await _0x4fdbb1.download(_0x11207b);
                              let _0x1391e2 = require("file-type");
                              let _0x5169af = _0x1391e2.fromBuffer(_0x4e2b72);
                              await fs.promises.writeFile('./' + _0x5169af.ext, _0x4e2b72);
                              if (_0x46182b.message.imageMessage.caption) {
                                const _0x44e17c = _0x46182b.message.imageMessage.caption;
                                if (_0x313f8b && _0x44e17c.includes("chat.whatsapp.com")) {
                                  return;
                                }
                                await _0x10ba11.sendMessage(_0x28b7c9, {
                                  'image': fs.readFileSync('./' + _0x5169af.ext),
                                  'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x246b37 + "_\n  📩 *Sent by:* _" + _0x149c96 + "_\n\n> 🔓 Message Text: " + _0x46182b.message.imageMessage.caption
                                });
                              } else {
                                await _0x10ba11.sendMessage(_0x28b7c9, {
                                  'image': fs.readFileSync('./' + _0x5169af.ext),
                                  'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x246b37 + "_\n  📩 *Sent by:* _" + _0x149c96 + '_'
                                });
                              }
                            }
                            _0x29a543();
                          } else {
                            if (_0x46182b.type === "videoMessage") {
                              async function _0x42c00d() {
                                var _0x45f0f6 = getRandom('');
                                const _0x333e38 = sms(_0x10ba11, _0x46182b);
                                const _0xa30bd1 = _0x46182b.message.videoMessage.fileLength;
                                const _0xeb935e = _0x46182b.message.videoMessage.seconds;
                                const _0x269237 = config.MAX_SIZE;
                                const _0xbe348a = _0xa30bd1 / 1048576;
                                if (_0x46182b.message.videoMessage.caption) {
                                  if (_0xbe348a < _0x269237 && _0xeb935e < 1800) {
                                    let _0x14fafc = await _0x333e38.download(_0x45f0f6);
                                    let _0x11ddfc = require("file-type");
                                    let _0x4d3560 = _0x11ddfc.fromBuffer(_0x14fafc);
                                    await fs.promises.writeFile('./' + _0x4d3560.ext, _0x14fafc);
                                    const _0x4848df = _0x46182b.message.videoMessage.caption;
                                    if (_0x313f8b && _0x4848df.includes("chat.whatsapp.com")) {
                                      return;
                                    }
                                    await _0x10ba11.sendMessage(_0x28b7c9, {
                                      'video': fs.readFileSync('./' + _0x4d3560.ext),
                                      'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x246b37 + "_\n  📩 *Sent by:* _" + _0x149c96 + "_\n\n> 🔓 Message Text: " + _0x46182b.message.videoMessage.caption
                                    });
                                  }
                                } else {
                                  let _0x58e9aa = await _0x333e38.download(_0x45f0f6);
                                  let _0x2d5ca6 = require("file-type");
                                  let _0x40f976 = _0x2d5ca6.fromBuffer(_0x58e9aa);
                                  await fs.promises.writeFile('./' + _0x40f976.ext, _0x58e9aa);
                                  const _0x1f7a4d = _0x46182b.message.videoMessage.fileLength;
                                  const _0x116c3d = _0x46182b.message.videoMessage.seconds;
                                  const _0x2a0b1a = config.MAX_SIZE;
                                  const _0x517b71 = _0x1f7a4d / 1048576;
                                  if (_0x517b71 < _0x2a0b1a && _0x116c3d < 1800) {
                                    await _0x10ba11.sendMessage(_0x28b7c9, {
                                      'video': fs.readFileSync('./' + _0x40f976.ext),
                                      'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x246b37 + "_\n  📩 *Sent by:* _" + _0x149c96 + '_'
                                    });
                                  }
                                }
                              }
                              _0x42c00d();
                            } else {
                              if (_0x46182b.type === "documentMessage") {
                                async function _0x33ee26() {
                                  var _0x52d952 = getRandom('');
                                  const _0x1b523e = sms(_0x10ba11, _0x46182b);
                                  let _0x35e479 = await _0x1b523e.download(_0x52d952);
                                  let _0xb3c044 = require("file-type");
                                  let _0x323b7f = _0xb3c044.fromBuffer(_0x35e479);
                                  await fs.promises.writeFile('./' + _0x323b7f.ext, _0x35e479);
                                  if (_0x46182b.message.documentWithCaptionMessage) {
                                    await _0x10ba11.sendMessage(_0x28b7c9, {
                                      'document': fs.readFileSync('./' + _0x323b7f.ext),
                                      'mimetype': _0x46182b.message.documentMessage.mimetype,
                                      'fileName': _0x46182b.message.documentMessage.fileName,
                                      'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x246b37 + "_\n  📩 *Sent by:* _" + _0x149c96 + "_\n"
                                    });
                                  } else {
                                    await _0x10ba11.sendMessage(_0x28b7c9, {
                                      'document': fs.readFileSync('./' + _0x323b7f.ext),
                                      'mimetype': _0x46182b.message.documentMessage.mimetype,
                                      'fileName': _0x46182b.message.documentMessage.fileName,
                                      'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x246b37 + "_\n  📩 *Sent by:* _" + _0x149c96 + "_\n"
                                    });
                                  }
                                }
                                _0x33ee26();
                              } else {
                                if (_0x46182b.type === "audioMessage") {
                                  async function _0x1e4b6b() {
                                    var _0x3267c7 = getRandom('');
                                    const _0xf5a126 = sms(_0x10ba11, _0x46182b);
                                    let _0x512184 = await _0xf5a126.download(_0x3267c7);
                                    let _0x2214dc = require("file-type");
                                    let _0x4819e6 = _0x2214dc.fromBuffer(_0x512184);
                                    await fs.promises.writeFile('./' + _0x4819e6.ext, _0x512184);
                                    if (_0x46182b.message.audioMessage) {
                                      const _0x19e5eb = await _0x10ba11.sendMessage(_0x28b7c9, {
                                        'audio': fs.readFileSync('./' + _0x4819e6.ext),
                                        'mimetype': _0x46182b.message.audioMessage.mimetype,
                                        'fileName': _0x8fbd9a.id + ".mp3"
                                      });
                                      const _0x330c68 = {
                                        text: "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x246b37 + "_\n  📩 *Sent by:* _" + _0x149c96 + "_\n"
                                      };
                                      const _0x2601b5 = {
                                        quoted: _0x19e5eb
                                      };
                                      return await _0x10ba11.sendMessage(_0x28b7c9, _0x330c68, _0x2601b5);
                                    } else {
                                      if (_0x46182b.message.audioMessage.ptt === "true") {
                                        const _0xdce852 = await _0x10ba11.sendMessage(_0x28b7c9, {
                                          'audio': fs.readFileSync('./' + _0x4819e6.ext),
                                          'mimetype': _0x46182b.message.audioMessage.mimetype,
                                          'ptt': "true",
                                          'fileName': _0x8fbd9a.id + ".mp3"
                                        });
                                        const _0x33dc6f = {
                                          text: "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x246b37 + "_\n  📩 *Sent by:* _" + _0x149c96 + "_\n"
                                        };
                                        const _0x72ad47 = {
                                          quoted: _0xdce852
                                        };
                                        return await _0x10ba11.sendMessage(_0x28b7c9, _0x33dc6f, _0x72ad47);
                                      }
                                    }
                                  }
                                  _0x1e4b6b();
                                } else {
                                  if (_0x46182b.type === "stickerMessage") {
                                    async function _0x2a511d() {
                                      var _0xeff803 = getRandom('');
                                      const _0x1ab5ab = sms(_0x10ba11, _0x46182b);
                                      let _0x5ee374 = await _0x1ab5ab.download(_0xeff803);
                                      let _0x15289b = require("file-type");
                                      let _0xe3bfb9 = _0x15289b.fromBuffer(_0x5ee374);
                                      await fs.promises.writeFile('./' + _0xe3bfb9.ext, _0x5ee374);
                                      if (_0x46182b.message.stickerMessage) {
                                        const _0x29ec5e = await _0x10ba11.sendMessage(_0x28b7c9, {
                                          'sticker': fs.readFileSync('./' + _0xe3bfb9.ext),
                                          'package': "Didula MD V2 💚"
                                        });
                                        const _0x518450 = {
                                          text: "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x246b37 + "_\n  📩 *Sent by:* _" + _0x149c96 + "_\n"
                                        };
                                        const _0x1eb563 = {
                                          quoted: _0x29ec5e
                                        };
                                        return await _0x10ba11.sendMessage(_0x28b7c9, _0x518450, _0x1eb563);
                                      } else {
                                        const _0xad655c = await _0x10ba11.sendMessage(_0x28b7c9, {
                                          'sticker': fs.readFileSync('./' + _0xe3bfb9.ext),
                                          'package': "Didula MD V2 💚"
                                        });
                                        const _0x205ba4 = {
                                          text: "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x246b37 + "_\n  📩 *Sent by:* _" + _0x149c96 + "_\n"
                                        };
                                        const _0x5067e9 = {
                                          quoted: _0xad655c
                                        };
                                        return await _0x10ba11.sendMessage(_0x28b7c9, _0x205ba4, _0x5067e9);
                                      }
                                    }
                                    _0x2a511d();
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              } else {
                console.log("Original message not found for revocation.");
              }
            }
            if (!_0x313f8b) {
              if (_0xac4c62.msg && _0xac4c62.msg.type === 0) {
                _0x2375da(_0xac4c62);
              } else {
                _0x361068(_0xac4c62);
              }
            }
          }
        }
      }









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
