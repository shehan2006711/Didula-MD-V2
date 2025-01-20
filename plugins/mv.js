const axios = require('axios');
const { cmd } = require('../command');

// Helper function to fetch data from the API
async function fetchApi(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('API Fetch Error:', error);
        throw new Error('Failed to fetch data from API.');
    }
}

// Command to search for movies
cmd({
    pattern: "movie",
    desc: "Search for movies",
    use: '.searchmovie < Movie Name >',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        if (!q) return await reply("Please provide a movie name.");

        const response = await fetchApi(`https://apicine-api.vercel.app/api/cinesubz/search?q=${encodeURIComponent(q)}&apikey=test1`);
        const movies = response.data.data;

        if (movies.length === 0) return await reply("No movies found.");

        let message = `🎬 *Movie Search Results for:* ${q}\n\n`;
        movies.forEach((movie, index) => {
            message += `${index + 1}. ${movie.title}\n   Rating: ${movie.rating}\n   Year: ${movie.year}\n   [Details](${movie.link})\n\n`;
        });

        await conn.sendMessage(from, { text: message }, { quoted: mek });
    } catch (e) {
        console.error(e);
        await reply("An error occurred while searching for movies.");
    }
});

// Command to download a movie
cmd({
    pattern: "dlmovie",
    desc: "Download movie",
    use: '.downloadmovie < Movie URL >',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        if (!q.includes('cinesubz.co/movies')) return await reply("Invalid movie URL.");

        const response = await fetchApi(`https://apicine-api.vercel.app/api/cinesubz/download?url=${encodeURIComponent(q)}&apikey=test1`);
        const downloadOptions = response.data.data;

        if (!downloadOptions || downloadOptions.length === 0) {
            return await reply("No download options available.");
        }

        let message = `🎬 *Download Options for Movie:*\n\n`;
        downloadOptions.forEach((option, index) => {
            message += `${index + 1}. ${option.fileName}\n   Type: ${option.type}\n   Size: ${option.fileSize}\n   [Download](${option.href})\n\n`;
        });

        await conn.sendMessage(from, { text: message }, { quoted: mek });
    } catch (e) {
        console.error(e);
        await reply("An error occurred while fetching download options.");
    }
});