const axios = require("axios");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");
const { sendReply, sendMediaMessage } = require(__dirname + "/../../lib/context"); //
module.exports = async (context) => {
    const { client, m, text, botname } = context;

    // Check if text is provided
    if (!text) {
        return sendReply(client, m, "Provide a search term for the sticker!"); // Use sendReply for text replies
    }

    // Notify user in groups to avoid spam
    if (m.isGroup) {
        await sendReply(client, m, "To avoid spam, I will send the stickers in your inbox. 📥"); // Use sendReply for text replies
    }

    const tenorApiKey = "AIzaSyCyouca1_KKy4W_MG1xsPzuku5oa8W358c"; // Tenor API key

    try {
        // Fetch GIFs from Tenor API
        const gif = await axios.get(
            `https://tenor.googleapis.com/v2/search?q=${text}&key=${tenorApiKey}&client_key=my_project&limit=8&media_filter=gif`
        );

        // Send up to 8 stickers
        for (let i = 0; i < Math.min(gif.data.results.length, 8); i++) {
            const gifUrl = gif.data.results[i].media_formats.gif.url;

            // Create a sticker from the GIF
            const stickerMess = new Sticker(gifUrl, {
                pack: botname,
                type: StickerTypes.FULL,
                categories: ["🤩", "🎉"],
                id: "12345",
                quality: 60,
                background: "transparent",
            });

            const stickerBuffer = await stickerMess.toBuffer();

            // Send the sticker to the user's inbox
            await sendMediaMessage(client, m, { sticker: stickerBuffer }, { quoted: m }); // Use sendMediaMessage for stickers
        }

    } catch (error) {
        console.error("Error occurred:", error);
        await sendReply(client, m, "Some error occurred while fetching all stickers."); // Use sendReply for error messages
    }
};
