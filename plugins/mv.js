
const { cmd } = require('../command'); // Make sure the path is correct
const { fetchJson } = require('../lib/functions'); // Make sure the path is correct

const apilink = 'https://vajira-movie-api.vercel.app/api/cinesubz'; // API LINK

cmd({
  pattern: "moviedl",
  alias: ["dlmovie"],
  react: '🎬',
  desc: "Download movies",
  category: "download",
  use: '.moviedownload <movie link>',
  filename: __filename
},
async(conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return reply('*Please provide a movie URL!*');

    const download_info = await fetchJson(`${apilink}/download?url=${encodeURIComponent(q)}&apikey=vajiratech`);

    const { data } = download_info;
    if (!data || data.length === 0) return reply('No download links available!');

    let msg = `🎥 *MOVIE DOWNLOAD LINKS* 🎥\n`;
    data.forEach(link => {
      msg += `• *${link.type}* - [${link.fileName}](${link.href}) - Size: ${link.fileSize}\n`;
    });

    await conn.sendMessage(from, { text: msg, quoted: mek });
  } catch (e) {
    reply('*Error occurred while fetching download links!*');
    console.error(e);
  }
});

cmd({
  pattern: "movie",
  alias: ["searchmovie"],
  react: "🔍",
  desc: "Search for movies",
  category: "search",
  use: '.moviesearch <movie name>',
  filename: __filename
},
async(conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return reply("Please provide a movie name!");

    const search_results = await fetchJson(`${apilink}/search?q=${encodeURIComponent(q)}&apikey=vajiratech`);

    const { data } = search_results;
    if (!data || data.length === 0) return reply("No results found!");

    let msg = `🎬 *MOVIE SEARCH RESULTS* 🎬\n`;
    data.data.forEach(movie => {
      msg += `*Title:* ${movie.title}\n`;
      msg += `*Year:* ${movie.year}\n`;
      msg += `*Rating:* ${movie.rating}\n`;
      msg += `*Description:* ${movie.description}\n`;
      msg += `*Link:* [Watch Here](${movie.link})\n`;
      msg += `*Image:* [View Image](${movie.imageSrc})\n\n`;
    });

    await conn.sendMessage(from, { text: msg, quoted: mek });
  } catch (error) {
    console.error(error);
    reply('An error occurred while processing your request. Please try again later.');
  }
});