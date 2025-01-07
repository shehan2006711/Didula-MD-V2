
const { cmd } = require('../command'); // Adjust based on your command handling system
const axios = require("axios");
const cheerio = require("cheerio"); // For parsing HTML
require("dotenv").config();
const CREATOR = "Dark Yasiya";

// Function to fetch movie details from Hoopla
async function fetchMovieDetails(query) {
    const searchUrl = `https://www.hoopladigital.com/search?q=${encodeURIComponent(query)}&scope=MOVIE&type=direct`;
    try {
        const response = await axios.get(searchUrl);
        const html = response.data;
        const $ = cheerio.load(html);
        const movies = [];

        $(".card-title").each((i, el) => {
            const title = $(el).text().trim();
            const url = $(el).parent().attr("href");
            const image = $(el).closest(".card").find("img").attr("src");
            const description = $(el).closest(".card").find(".card-description").text().trim();
            
            movies.push({ title, url: `https://www.hoopladigital.com${url}`, image, description });
        });

        if (movies.length === 0) {
            throw new Error("No Movies found.");
        }

        return { data: movies };
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching movie details: " + error.message);
    }
}

// Command to handle the movie search request
cmd({
    pattern: "movie1",
    alias: ["moviedetails"],
    desc: "Get details of a movie from Hoopla.",
    category: "Movies",
    react: "🎬",
    use: '.movie <movie_name>',
    filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
    if (!args[0]) {
        return reply("Please provide a movie name.");
    }

    const movieName = args.join(" ");
    try {
        reply(`Searching for movie details of "${movieName}"...`);

        const list = await fetchMovieDetails(movieName);
        const latestMovie = list.data[0]; // Get the first movie item

        const movieMessage = `
            🎬 *${latestMovie.title}*
            *📖 Description:* ${latestMovie.description || "No description available."}
            🔗 [Watch Here](${latestMovie.url})
        `;

        await conn.sendMessage(from, { image: { url: latestMovie.image }, caption: movieMessage });
    } catch (error) {
        console.error(error);
        reply(`An error occurred: ${error.message}`);
    }
});
