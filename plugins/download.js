const { cmd, commands } = require('../command');
const scraper = require("../lib/scraperd");
const axios = require('axios');
const fetch = require('node-fetch');
const { fetchJson, getBuffer } = require('../lib/functions');
const { lookup } = require('mime-types');
const fs = require('fs');
const path = require('path');
const yts = require('yt-search'); // For YouTube search
const cheerio = require('cheerio'); // Import cheerio for HTML parsing










cmd({
    pattern: "dl",
    react: "📥",
    alias: ["dlurl"],
    desc: "Direct link uploader",
    category: "download",
    use: '.dl <link>',
    filename: __filename
},
async (conn, mek, m, { 
    from, quoted, body, args, q, reply 
}) => {
    try {
        if (!q) return reply('❗ Please provide a link!');
        
        // Validate URL format
        const isValidUrl = (url) => {
            try {
                new URL(url);
                return true;
            } catch {
                return false;
            }
        };

        if (!isValidUrl(q)) return reply('❌ Invalid URL format! Please check the link.');

        // Fetch the file data from the provided link
        const axios = require('axios');
        const mimeTypes = require('mime-types');
        
        const res = await axios.get(q, { 
            responseType: 'arraybuffer',
            timeout: 15000 // Set a timeout of 15 seconds
        });

        // Get MIME type and extension
        const mime = res.headers['content-type'] || 'application/octet-stream';
        const extension = mimeTypes.extension(mime) || 'unknown';

        // Get file size from headers
        const fileSize = res.headers['content-length'] || 0;
        const maxFileSize = 2048 * 2048 * 2048; // 10 MB

        if (fileSize > maxFileSize) {
            return reply('❗ File is too large to upload (limit: 10MB).');
        }

        // Define file name
        const fileName = `Didula MD V2 💚.${extension}`;

        // Send the file as a document
        await conn.sendMessage(
            from,
            {
                document: { url: q },
                caption: "> Didula MD V2 💚",
                mimetype: mime,
                fileName: fileName
            },
            { quoted: mek }
        );

    } catch (error) {
        // Handle errors gracefully
        console.error(error);
        reply(`❌ Error: ${error.message}`);
    }
});











// Download APK
cmd({
    pattern: "apk",
    desc: "Downloads Apk",
    use: ".apk <app_name>",
    react: "📥",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    const appId = q.trim();
    if (!appId) return reply(`Please provide an app name`);

    reply("_Downloading " + appId + "_");

    try {
        const appInfo = await scraper.aptoideDl(appId);
        const buff = await getBuffer(appInfo.link);

        if (!buff || !appInfo.appname) {
            return await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        }

        await conn.sendMessage(
            from,
            { document: buff, caption: `*Didula MD V2 💚*`, mimetype: "application/vnd.android.package-archive", filename: `${appInfo.appname}.apk` },
            { quoted: mek }
        );

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
        reply("*_Download Success_*");
    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply(`Error: ${e.message}`);
    }
});



cmd({
  pattern: "song",
  react: '🎶',
  desc: "Download audio from YouTube by searching for keywords (using API 2).",
  category: "music",
  use: ".play1 <song name or keywords>",
  filename: __filename
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const searchQuery = args.join(" ");
    if (!searchQuery) {
      return reply("*Please provide a song name or keywords to search for.*");
    }

    reply("*🎧 Searching for the song...*");

    const searchResults = await yts(searchQuery);
    if (!searchResults.videos || searchResults.videos.length === 0) {
      return reply(`❌ No results found for "${searchQuery}".`);
    }

    const firstResult = searchResults.videos[0];
    const videoUrl = firstResult.url;

    // Call the API to download the audio
    const apiUrl = `https://api.davidcyriltech.my.id/download/ytmp3?url=${videoUrl}`;
    const response = await axios.get(apiUrl);
    if (!response.data.success) {
      return reply(`❌ Failed to fetch audio for "${searchQuery}".`);
    }

    const { title, download_url } = response.data.result;

    // Send the audio file
    await conn.sendMessage(from, {
      audio: { url: download_url },
      mimetype: 'audio/mp4',
      ptt: false
    }, { quoted: mek });

    reply(`✅ *${title}* has been downloaded successfully!`);
  } catch (error) {
    console.error(error);
    reply("❌ An error occurred while processing your request.");
  }
});



// Download Videos
cmd({
    pattern: "video",
    react: "📽️",
    desc: "Download videos",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply('⛔ Please give a video title');
        const videodl = await fetchJson(`https://api.davidcyriltech.my.id/download/ytmp4?url=${q}`);
        const data = videodl.result;
        const formatViews = views => views >= 1_000_000_000 ? `${(views / 1_000_000_000).toFixed(1)}B` : views >= 1_000_000 ? `${(views / 1_000_000).toFixed(1)}M` : views >= 1_000 ? `${(views / 1_000).toFixed(1)}K` : views.toString();
        let dec = `
🌟 *Video Spotlight: Didula MD V2* 🌟

🎵 *Title:* ${data.title}  
👤 *Artist:* ${data.author}  
📝 *Description:* ${data.description}  
⏰ *Duration:* ${data.duration}  
👁️ *Views:* ${formatViews(data.views)}  

---

🔗 *Options:*  
1️⃣ Watch Video 🎥  
2️⃣ Download Document 📂  
`;

        const or = await conn.sendMessage(from, {
            image: {
                url: data.thumbnail
            }, caption: dec
        }, {
            quoted: mek
        });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === or.key.id) {
                switch (selectedOption) {
                    case '1':
                        await conn.sendMessage(from, {
                            video: {
                                url: data.download_url
                            }, mimetype: "video/mp4"
                        }, {
                            quoted: mek
                        });
                        await conn.sendMessage(from, {
                            react: {
                                text: '✔️', key: mek.key
                            }
                        });
                        break;
                    case '2':
                        await conn.sendMessage(from, {
                            document: {
                                url: data.download_url
                            }, mimetype: "video/mp4", fileName: `${data.title}.mp4`, caption: "> Didula MD V2 💚 "
                        }, {
                            quoted: mek
                        });
                        await conn.sendMessage(from, {
                            react: {
                                text: '✔️', key: mek.key
                            }
                        });
                        break;
                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }
            }
        });

    } catch (e) {
        console.error(e);
        reply(`Error: ${e}`);
    }
});





// Download Wallpaper
cmd({
    pattern: "wallpaper",
    alias: ["wallpaperdownload"],
    react: "🖼️",
    desc: "Download a random wallpaper",
    category: "download",
    use: '.wallpaper',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const searchUrl = 'https://unsplash.com/s/photos/wallpaper';
        const { data } = await axios.get(searchUrl);
        const $ = cheerio.load(data);

        const results = [];
        $('figure img').each((index, element) => {
            const imgUrl = $(element).attr('src');
            results.push(imgUrl);
        });

        if (results.length === 0) {
            return await reply("No wallpapers found!");
        }

        // Randomly select an image from the results
        const selectedImage = results[Math.floor(Math.random() * results.length)];

        // Send the selected image directly
        await conn.sendMessage(from, { image: { url: selectedImage }, caption: "Here is your wallpaper!" }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply('An error occurred while downloading the wallpaper. Please try again later.');
    }
});