const yts = require("yt-search");
const { sendReply, sendMediaMessage } = require(__dirname + "/../../lib/context"); // 

module.exports = async (context) => {
    const { client, m, text } = context;

    try {
        // Check if text is provided
        if (!text) {
            return sendReply(client, m, "Please provide a media query."); // Use sendReply for text replies
        }

        // Search for YouTube videos
        const info = await yts(text);
        const results = info.videos;

        // Check if results are found
        if (!results.length) {
            return sendReply(client, m, "No results found."); // Use sendReply for text replies
        }

        // Build the captions for the results
        let captions = "";
        for (let i = 0; i < Math.min(results.length, 10); i++) {
            captions += `----------------\nTitle: ${results[i].title}\nTime: ${results[i].timestamp}\nUrl: ${results[i].url}\n`;
        }
        captions += "\n======\n*Powered by KEITH-MD*";

        // Send the first result's thumbnail with captions
        await sendMediaMessage(client, m, {
            image: { url: results[0].thumbnail },
            caption: captions
        });

    } catch (error) {
        await sendReply(client, m, `Error: ${error.message}`); // Use sendReply for error messages
    }
};
