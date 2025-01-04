const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const { cmd } = require('../command');


cmd({
    pattern: "mfire",
    desc: "Download a file from MediaFire",
    category: "download",
    react: "✅",
    filename: __filename
}, async (conn, mek, m, { from, quoted, reply }) => {
    try {
      
        const mediafireUrl = m.text.split(" ")[1]; 

       
        if (!mediafireUrl) {
            return reply("Please provide a valid MediaFire URL.");
        }

       
        const { data } = await axios.get(mediafireUrl);
        const $ = cheerio.load(data);

       
        const downloadLink = $('a#download_button').attr('href');
        console.log("Download link extracted:", downloadLink);

       
        if (!downloadLink) {
            return reply("Could not find the download link. Please check the URL.");
        }

      
        const response = await axios.get(downloadLink, { responseType: 'stream' });
        console.log("File download started...");

        const fileName = mediafireUrl.split('/').pop();
        const filePath = `./downloads/${fileName}`;

       
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        writer.on('finish', () => {
            console.log("File downloaded successfully.");
          
            conn.sendMessage(from, {
                document: { url: filePath },
                fileName: fileName,
                mimetype: "application/octet-stream"
            });
            fs.unlinkSync(filePath); 
        });

        writer.on('error', (err) => {
            console.error("Error saving file:", err);
            reply("Error downloading the file.");
        });

    } catch (error) {
        console.error("An error occurred:", error);
        reply(`An error occurred while downloading the file: ${error.message}`);
    }
});
