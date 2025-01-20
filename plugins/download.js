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
    pattern: "movie",
    alias: ["smovie"],
    react: "🎬",
    desc: "Search for movies",
    category: "movie",
    use: '.searchmovie < Movie Name >',
    filename: __filename
},
async(conn, mek, m, { from, prefix, q }) => {
    try {
        if (!q) return await reply("Please provide a movie name to search.");

        // Define the API link and API key directly in the request
        const apilink = "https://apicine-api.vercel.app/api/cinesubz/search";
        const apikey = "test1";

        // Fetch data from the API
        const response = await axios.get(`${apilink}?q=${encodeURIComponent(q)}&apikey=${apikey}`);
        const movies = response.data.data.data;

        if (movies.length < 1) return await reply("No movies found for your search.");

        let message = "🎥 *Movie Search Results* 🎥\n\n";
        
        movies.forEach((movie, index) => {
            message += `*${index + 1}.* [${movie.title}](${movie.link})\n`;
            message += `🌟 Rating: ${movie.rating}\n`;
            message += `📅 Year: ${movie.year}\n`;
            message += `📝 Description: ${movie.description}\n`;
            message += `![Image](${movie.imageSrc})\n\n`;
        });

        await conn.sendMessage(from, { text: message, footer: "Powered by APICINE" }, { quoted: mek });
    } catch (error) {
        console.error(error);
        await conn.sendMessage(from, { text: "An error occurred while searching for movies." }, { quoted: mek });
    }
});




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

// Download Songs
cmd({
    pattern: "song",
    react: "🎵",
    desc: "Download songs",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply('⛔ Please give a song title');
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;
        const formatViews = views => views >= 1_000_000_000 ? `${(views / 1_000_000_000).toFixed(1)}B` : views >= 1_000_000 ? `${(views / 1_000_000).toFixed(1)}M` : views >= 1_000 ? `${(views / 1_000).toFixed(1)}K` : views.toString();
        let desc = `
🌟 *Song Spotlight: Didula MD V2* 🌟

🎵 *Title:* ${data.title}  
👤 *Artist:* ${data.author.name}  
📝 *Description:* ${data.description}  
⏰ *Duration:* ${data.timestamp}  
⏱️ *Posted:* ${data.ago} ago  
👁️ *Views:* ${formatViews(data.views)}  

---

🔗 *Options:*  
1️⃣ Listen to Audio 🎶  
2️⃣ Download Document 📂  
`;

        const or = await conn.sendMessage(from, {
            image: {
                url: data.thumbnail
            }, caption: desc
        }, {
            quoted: mek
        });

        const data1 = await fetchJson(`https://apitest1-f7dcf17bd59b.herokuapp.com/download/ytmp3?url=${url}`);

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === or.key.id) {
                switch (selectedOption) {
                    case '1':
                        await conn.sendMessage(from, {
                            audio: {
                                url: data1.result.dl_link
                            }, mimetype: "audio/mpeg"
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
                                url: data1.result.dl_link
                            }, mimetype: "audio/mpeg", fileName: `${data.title}.mp3`, caption: "> Didula MD V2 💚 "
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
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;
        const formatViews = views => views >= 1_000_000_000 ? `${(views / 1_000_000_000).toFixed(1)}B` : views >= 1_000_000 ? `${(views / 1_000_000).toFixed(1)}M` : views >= 1_000 ? `${(views / 1_000).toFixed(1)}K` : views.toString();
        let dec = `
🌟 *Video Spotlight: Didula MD V2* 🌟

🎵 *Title:* ${data.title}  
👤 *Artist:* ${data.author.name}  
📝 *Description:* ${data.description}  
⏰ *Duration:* ${data.timestamp}  
⏱️ *Posted:* ${data.ago} ago  
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

        const data1 = await fetchJson(`https://api.giftedtech.my.id/api/download/dlmp4?apikey=gifted&url=${url}`);

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === or.key.id) {
                switch (selectedOption) {
                    case '1':
                        await conn.sendMessage(from, {
                            video: {
                                url: data1.result.download_url
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
                                url: data1.result.download_url
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