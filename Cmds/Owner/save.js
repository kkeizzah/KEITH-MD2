module.exports = async (context) => {
    const { client, m } = context;
    const textL = m.text.toLowerCase();
    const quotedMessage = m.msg?.contextInfo?.quotedMessage;

    // Check if the quoted message is valid and if the user is trying to post
    if (quotedMessage && textL.startsWith(prefix + "post") && !m.quoted.chat.includes("status@broadcast")) {
        return m.reply("You did not tag a status media to post.");
    }

    // Check if the owner is sending the post command and if the quoted message is from a broadcast status
    if (Owner && quotedMessage && textL.startsWith(prefix + "post") && m.quoted.chat.includes("status@broadcast")) {
        // Handle image media
        if (quotedMessage.imageMessage) {
            let imageCaption = quotedMessage.imageMessage.caption;
            let imageUrl = await client.downloadAndSaveMediaMessage(quotedMessage.imageMessage);

            // Post the image to the status
            await client.setStatus({ image: { url: imageUrl }, caption: imageCaption });
            m.reply("Media has been posted to your status.");
        }

        // Handle video media
        if (quotedMessage.videoMessage) {
            let videoCaption = quotedMessage.videoMessage.caption;
            let videoUrl = await client.downloadAndSaveMediaMessage(quotedMessage.videoMessage);

            // Post the video to the status
            await client.setStatus({ video: { url: videoUrl }, caption: videoCaption });
            m.reply("Media has been posted to your status.");
        }
    }
};
