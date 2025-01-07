const { cmd } = require('../command'); // Adjust based on your command handling system
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
require("dotenv").config();
const CREATOR = "Dark Yasiya";

// Function to search for movies on Firemovies
async function searchMovies(query) {
    try {
        const url = `https://firemovieshub.com/?s=${query}`;

        // Launch Puppeteer browser
        const browser = await puppeteer.launch({
            headless: true,
            executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome' // Adjust this path if necessary
        });
        const page = await browser.newPage();

        // Set a user-agent and go to the page
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        // Wait for the results to load
        await page.waitForSelector('div.title a'); // This waits for the movie titles to appear

        // Get the page content after it has loaded
        const pageContent = await page.content();

        // Use Cheerio to parse the page content
        const $ = cheerio.load(pageContent);

        // Extract movie titles, years, links, and images from the page
        const data = [];
        $("div.result-item").each((c, d) => {
            data.push({
                title: $(d).find("div.title > a").text(),
                ntitle: $(d).find("span.movies").text(),
                year: $(d).find("span.year").text(),
                link: $(d).find("a").attr("href"),
                image: $(d).find("img").attr("src")
            });
        });

        // Close the browser after scraping
        await browser.close();

        if (data.length === 0) {
            throw new Error("No movies found for the search query.");
        }

        return data;
    } catch (error) {
        console.error(error);
        throw new Error("Error searching for movies: " + error.message);
    }
}

// Command to handle the Firemovies search request
cmd({
    pattern: "firemovie",
    alias: ["fmovie"],
    desc: "Search for movies on Firemovies.",
    category: "Movies",
    react: "🎬",
    use: '.firemovie <movie_name>',
    filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
    if (!args[0]) {
        return reply("Please provide a movie name to search.");
    }

    const query = args.join(" ");
    
    try {
        reply("Searching for movies...");

        const movies = await searchMovies(query);
        let movieMessage = "🎬 *Search Results:*\n\n";

        for (const movie of movies) {
            movieMessage += `
            *Title:* ${movie.title}
            *Year:* ${movie.year}
            *Link:* ${movie.link}
            `;

            // Send the movie message with the image
            await conn.sendMessage(from, { image: { url: movie.image }, caption: movieMessage });
        }
    } catch (error) {
        console.error(error);
        reply(`An error occurred: ${error.message}`);
    }
});