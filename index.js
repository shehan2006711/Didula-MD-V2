
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
const { sms, downloadMediaMessage } = require('./lib/msg')
const axios = require('axios')
const { File } = require('megajs')
const prefix = '.'

const ownerNumber = ['94771820962']

// Session handling
async function initSession() {
  if (!fs.existsSync(__dirname + '/auth_info_baileys/creds.json')) {
    if(!config.SESSION_ID) {
      console.error('Please add your session to SESSION_ID env!!');
      process.exit(1);
    }
    
    try {
      const sessdata = config.SESSION_ID;
      const filer = File.fromURL(`https://mega.nz/file/${sessdata}`);
      const data = await new Promise((resolve, reject) => {
        filer.download((err, data) => {
          if(err) reject(err);
          else resolve(data);
        });
      });
      
      await fs.promises.writeFile(__dirname + '/auth_info_baileys/creds.json', data);
      console.log("Session downloaded successfully ✅");
    } catch(err) {
      console.error("Error downloading session:", err);
      process.exit(1);
    }
  }
}

const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

async function connectToWA() {
  try {
    console.log("Connecting to WhatsApp...");
    const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys/');
    const { version } = await fetchLatestBaileysVersion();

    const conn = makeWASocket({
      logger: P({ level: 'silent' }),
      printQRInTerminal: false,
      browser: Browsers.macOS("Firefox"),
      syncFullHistory: true,
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, P({ level: 'silent' }))
      },
      version
    });

    conn.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect } = update;
      
      if(connection === 'close') {
        const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
        console.log('Connection closed due to:', lastDisconnect?.error, '\nReconnecting:', shouldReconnect);
        if(shouldReconnect) {
          await connectToWA();
        }
      } else if(connection === 'open') {
        console.log('Connected to WhatsApp');
        await loadPlugins();
        await sendInitialMessage(conn);
      }
    });

    conn.ev.on('creds.update', saveCreds);

    conn.ev.on('messages.upsert', async(mek) => {
      try {
        await handleMessage(conn, mek);
      } catch(err) {
        console.error('Error handling message:', err);
      }
    });

  } catch(err) {
    console.error('Error in connectToWA:', err);
    // Implement exponential backoff for reconnection
    setTimeout(connectToWA, 5000);
  }
}

async function loadPlugins() {
  try {
    const path = require('path');
    fs.readdirSync("./plugins/").forEach((plugin) => {
      if (path.extname(plugin).toLowerCase() === ".js") {
        require("./plugins/" + plugin);
      }
    });
    console.log('Plugins loaded successfully ✅');
  } catch(err) {
    console.error('Error loading plugins:', err);
  }
}

async function sendInitialMessage(conn) {
  try {
    const up = `Bot connected successfully ✅\n\nPREFIX: ${prefix}`;
    await conn.sendMessage(ownerNumber + "@s.whatsapp.net", { 
      image: { url: `https://i.ibb.co/tC37Q7B/20241220-122443.jpg` }, 
      caption: up 
    });
  } catch(err) {
    console.error('Error sending initial message:', err);
  }
}

async function handleMessage(conn, messageUpdate) {
  const mek = messageUpdate.messages[0];
  if (!mek?.message) return;

  try {
    const m = sms(conn, mek);
    const type = getContentType(mek.message);
    const from = mek.key.remoteJid;
    
    // Message handling logic
    await conn.sendPresenceUpdate('composing', from);
    await conn.sendPresenceUpdate('recording', from);

    // Process message based on type and commands
    const events = require('./command');
    const body = extractMessageBody(mek, type);
    const isCmd = body?.startsWith(prefix);
    
    if(isCmd) {
      await handleCommand(conn, mek, m, body, events);
    }

    // Handle other message types and events
    await handleMessageEvents(conn, mek, m, events);

  } catch(err) {
    console.error('Error in message handler:', err);
  }
}

// Additional helper functions
function extractMessageBody(mek, type) {
  if(type === 'conversation') return mek.message.conversation;
  if(type === 'extendedTextMessage') return mek.message.extendedTextMessage.text;
  if(type === 'imageMessage') return mek.message.imageMessage?.caption;
  if(type === 'videoMessage') return mek.message.videoMessage?.caption;
  return '';
}

// Express server setup
app.get("/", (req, res) => {
  res.send("Bot is running ✅");
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

// Initialize and start the bot
async function init() {
  try {
    await initSession();
    await connectToWA();
  } catch(err) {
    console.error('Initialization error:', err);
    process.exit(1);
  }
}

init();