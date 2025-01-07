const { cmd } = require('../command'); // Adjust based on your command handling system
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
require("dotenv").config();
const CREATOR = "Dark Yasiya";

// Function to fetch movie download link from Firemovies
async function fetchMovieDownloadLink(movieUrl) {
    try {
        // Launch Puppeteer browser with executable path
        const browser = await puppeteer.launch({
            headless: true,
            executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome' // Adjust this path if necessary
        });
        const page = await browser.newPage();

        // Set a user-agent and go to the page
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        await page.goto(movieUrl, { waitUntil: 'domcontentloaded' });

        // Wait for the results to load
        await page.waitForSelector('small.text a');

        // Get the page content after it has loaded
        const pageContent = await page.content();

        // Use Cheerio to parse the page content
        const $ = cheerio.load(pageContent);

        // Extract movie title and download link
        const title = $('small.text a').text();
        const downloadLink = $("a#link.btn").attr("href");

        // Close the browser after scraping
        await browser.close();

        if (!title || !downloadLink) {
            throw new Error("Movie title or download link not found.");
        }

        return { title, downloadLink };
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching movie download link: " + error.message);
    }
}

// Command to handle the Firemovies download request
cmd({
    pattern: "firemovie",
    alias: ["fmovie"],
    desc: "Get the download link for a movie from Firemovies.",
    category: "Movies",
    react: "🎬",
    use: '.firemovie <movie_url>',
    filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
    if (!args[0]) {
        return reply("Please provide a movie URL.");
    }

    const movieUrl = args[0];
    
    try {
        reply("Fetching the movie download link...");

        const movieData = await fetchMovieDownloadLink(movieUrl);
        const movieMessage = `
            🎬 *${movieData.title}*
            🔗 *Download Link:* ${movieData.downloadLink}
        `;

        reply(movieMessage);
    } catch (error) {
        console.error(error);
        reply(`An error occurred: ${error.message}`);
    }
});