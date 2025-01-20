
const { cmd } = require('../command');
const config = require('../config');
const { fetchJson, sleep } = require('../lib/functions');
const prabathApi = "test1"; // Update your API key
const api = "https://apicine-api.vercel.app/api/cinesubz/"; // Base API link

cmd({
    pattern: "nbt",
    alias: ["mv", "moviedl", "mvdl", "cinesub", "cinesubz"],
    desc: "movie",
    category: "download",
    react: "🎬",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q }) => {
    try {
        if (!q) {
            return await reply("Please provide the name of the movie.");
        }

        // Fetch movie search results
        const data = await fetchJson(`${api}search?q=${q}&apikey=${prabathApi}`);
        const allMovies = data.data.data;

        if (!allMovies.length) {
            return await reply("No movies found.");
        }

        const movieList = allMovies.map((app, index) => {
            return `${index + 1}. 🎬 ${app.title}`;
        }).join("\n");

        const message = '*Cinesubz Movie SEARCH*\n____________________________\n\n*Movies Found:*\n\n' + movieList;
        const sentMsg = await conn.sendMessage(from, { text: message }, { quoted: mek });

        // Listen for the user's response
        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const mek = messageUpdate.messages[0];
            if (!mek.message) return;

            const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
            const userResponse = parseInt(messageType); // Convert user response to number
            const selectedMovie = allMovies[userResponse - 1];

            // If the response is valid
            if (selectedMovie) {
                const movieDetails = await fetchJson(`${api}download?url=${selectedMovie.link}&apikey=${prabathApi}`);
                const desc = movieDetails.data;

                let movieTitle = selectedMovie.title;
                let releaseDate = selectedMovie.year;
                let imdbRating = selectedMovie.rating;
                let description = selectedMovie.description;
                let url = selectedMovie.link;
                let imageSrc = selectedMovie.imageSrc; // Assuming this is the correct image source

                let detailMessage = `
- Movie: ${movieTitle}
- Release Date: ${releaseDate}
- IMDB Rating: ${imdbRating}
- Description: ${description}
- Url: ${url}
- Image: ${imageSrc}
`;

                const detailsMsg = await conn.sendMessage(from, { text: detailMessage }, { quoted: mek });

                // Available qualities (assumed to be in the download response)
                let qualities = movieDetails.data.map((download, index) => `> ${index + 1}. ${download.fileName} (${download.fileSize})`).join("\n");

                let qualityMessage = `*Available Qualities:*\n\n${qualities}`;
                await conn.sendMessage(from, { text: qualityMessage }, { quoted: mek });

                // Listen for quality selection
                conn.ev.on('messages.upsert', async (qualityUpdate) => {
                    const qualityMek = qualityUpdate.messages[0];
                    if (!qualityMek.message) return;

                    const qualityType = parseInt(qualityMek.message.conversation || qualityMek.message.extendedTextMessage?.text);
                    const selectedQuality = movieDetails.data[qualityType - 1];

                    if (selectedQuality) {
                        const downloadLink = selectedQuality.href; // Direct download link
                        await conn.sendMessage(from, { document: { url: downloadLink }, mimetype: 'video/mp4', fileName: selectedQuality.fileName, caption: "> Cinesubz Movie Download" });
                    } else {
                        await reply("Invalid quality selection.");
                    }
                });
            } else {
                await reply("Invalid movie selection.");
            }
        });
    } catch (e) {
        console.log(e);
    }
});

// Utility function to parse size
function parseSize(sizeStr) {
    let sizeMatch = sizeStr.match(/^([\d.]+)\s*GB$/);
    return sizeMatch ? parseFloat(sizeMatch[1]) : 0;
}