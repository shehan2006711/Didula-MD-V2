const { cmd } = require('../command');
const axios = require('axios');

// Command to search for movies
cmd({
    pattern: "movie",
    desc: "Search for movies",
    use: ".movie <movie_name>",
    react: "🎬",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    if (!q) return reply('Please provide a movie title!');

    try {
        const response = await axios.get(`https://apicine-api.vercel.app/api/cinesubz/search?q=${encodeURIComponent(q)}&apikey=test1`);
        const movies = response.data.data.data;

        if (movies.length === 0) return reply('No movies found!');

        let message = `🎥 *Movie Search Results* 🎥\n`;
        movies.forEach((movie, index) => {
            message += `\n${index + 1}. *${movie.title}*\n   Year: ${movie.year}\n   Rating: ${movie.rating}\n   [More Info](${movie.link})\n`;
        });
        message += `\n\nReply with the movie number to download.`;

        const sentMsg = await conn.sendMessage(from, { text: message }, { quoted: mek });

        const searchResponseHandler = async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = parseInt(msg.message.extendedTextMessage.text.trim(), 10) - 1;

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === sentMsg.key.id) {
                if (selectedOption >= 0 && selectedOption < movies.length) {
                    const movieLink = movies[selectedOption].link;

                    // Fetch movie details and download links
                    const movieDetailsResponse = await axios.get(`https://apicine-api.vercel.app/api/cinesubz/movie?url=${encodeURIComponent(movieLink)}&apikey=test1`);
                    const movieDetails = movieDetailsResponse.data.data.moviedata;
                    const downloadLinks = movieDetailsResponse.data.data.dllinks.directDownloadLinks;

                    let downloadMessage = `🎬 *${movieDetails.title}*\n\n`;
                    downloadMessage += `${movieDetails.description}\n\n`;
                    downloadMessage += `*Director:* ${movieDetails.director}\n`;
                    downloadMessage += `*Cast:* ${movieDetails.cast.map(actor => `${actor.name} as ${actor.character}`).join(', ')}\n\n`;
                    downloadMessage += `*Download Links:*\n`;
                    downloadLinks.forEach(link => {
                        downloadMessage += `- ${link.quality} (${link.size}): [Download](${link.link})\n`;
                    });

                    await conn.sendMessage(from, { text: downloadMessage }, { quoted: mek });
                } else {
                    reply('Invalid option. Please select a valid movie number.🔴');
                }
                conn.ev.off('messages.upsert', searchResponseHandler);
            }
        };

        conn.ev.on('messages.upsert', searchResponseHandler);

    } catch (error) {
        console.error(error);
        reply('An error occurred while searching for movies. Please try again later.');
    }
});