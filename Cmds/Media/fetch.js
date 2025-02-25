const axios = require("axios");
const { sendReply, sendMediaMessage } = require(__dirname + "/../../lib/context"); // Import functions from context.js
const { format } = require("util");

module.exports = async (context) => {
    const { client, m, text } = context;

    // Check if text is provided
    if (!text) {
        return sendReply(client, m, "Please provide a link."); // Use sendReply for text replies
    }

    // Validate the URL properly
    const urlRegex = /^(https?:\/\/[^\s/$.?#].[^\s]*)$/i;
    if (!urlRegex.test(text)) {
        return sendReply(client, m, "Invalid URL."); // Use sendReply for text replies
    }

    await sendReply(client, m, "Please wait..."); // Use sendReply for text replies

    try {
        // Extract URL from the message text
        const url = text;

        // Fetch data from the URL
        const res = await axios.get(url, { responseType: "arraybuffer" });

        // Get the content type from headers
        const contentType = res.headers["content-type"];
        
        // Handle image, video, audio, and document files
        const fileTypes = {
            image: ["image/jpeg", "image/png", "image/gif", "image/webp", "image/bmp"],
            video: ["video/mp4", "video/mpeg", "video/webm", "video/ogg"],
            audio: ["audio/mp3", "audio/mpeg", "audio/ogg", "audio/wav", "audio/aac"],
            pdf: ["application/pdf"]
        };

        // Determine file type based on content type
        let fileType = "";
        for (const type in fileTypes) {
            if (fileTypes[type].includes(contentType)) {
                fileType = type;
                break;
            }
        }

        // Handle unsupported media types
        if (!fileType) {
            return sendReply(client, m, "Unsupported file type."); // Use sendReply for text replies
        }

        // Check if file is too large based on user permissions
        const { size, ext, mime } = await Func.getFile(url);

        if (size >= config.limit.download.free && !m.isPremium) {
            return sendReply(client, m, "File size exceeds free download limit."); // Use sendReply for text replies
        }
        if (size >= config.limit.download.premium && !m.isVIP) {
            return sendReply(client, m, "File size exceeds premium download limit."); // Use sendReply for text replies
        }
        if (size >= config.limit.download.VIP) {
            return sendReply(client, m, "File size exceeds VIP download limit."); // Use sendReply for text replies
        }

        // Generate filename based on URL or random filename
        const fileName = text.toLowerCase().includes("filename=")
            ? text.split("filename=")[1] + "." + ext
            : Func.getRandom(ext, 20);

        // Check if there's a caption in the URL
        const caption = text.toLowerCase().includes("caption=")
            ? text.split("caption=")[1]
            : "";

        // Send media based on file type
        if (fileType === "image" || fileType === "video" || fileType === "audio" || fileType === "pdf") {
            // Send the file based on the determined type
            return sendMediaMessage(client, m, {
                [fileType]: { url: url },
                mimetype: mime,
                fileName: fileName,
                caption: caption
            });
        }

        // If content is text or JSON, format and reply
        const responseText = res?.data;
        try {
            await sendReply(client, m, format(responseText)); // Use sendReply for text replies
        } catch (e) {
            await sendReply(client, m, "Error formatting the response: " + format(e)); // Use sendReply for error messages
        }

    } catch (error) {
        console.error("Error:", error);
        await sendReply(client, m, "An error occurred while processing your request."); // Use sendReply for error messages
    }
};
