const { sendReply, sendMediaMessage } = require(__dirname + "/../../lib/context");
const gis = require('g-i-s');
const { botname } = require(__dirname + "/../../settings");
module.exports = async (context) => {
    const { client, m, text } = context;

    // Check if text is provided
    if (!text) {
        return sendReply(client, m, "Provide a text"); // Use sendReply for text replies
    }

    try {
        // Use the 'text' as the search term for images
        gis(text, async (error, results) => {
            if (error) {
                return sendReply(client, m, "An error occurred while searching for images.\n" + error); // Use sendReply for error messages
            }

            // Check if results are found
            if (results.length === 0) {
                return sendReply(client, m, "No images found."); // Use sendReply for text replies
            }

            // Limit the number of images to send (e.g., 5)
            const numberOfImages = Math.min(results.length, 5);
            const imageUrls = results.slice(0, numberOfImages).map(result => result.url);

            // Send the images
            for (const url of imageUrls) {
                await sendMediaMessage(client, m, {
                    image: { url },
                    caption: `Downloaded by ${botname}`
                });
            }
        });
    } catch (e) {
        await sendReply(client, m, "An error occurred.\n" + e); // Use sendReply for error messages
    }
};
