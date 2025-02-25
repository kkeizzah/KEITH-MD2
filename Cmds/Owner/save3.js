
module.exports = async (context) => {
  const { client, m } = context;

  const quotedMessage = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;

  if (quotedMessage) {
    if (quotedMessage.imageMessage) {
      let imageCaption = quotedMessage.imageMessage.caption;
      let imageUrl = await client.downloadAndSaveMediaMessage(quotedMessage);
      client.sendMessage(m.chat, { image: { url: imageUrl }, caption: imageCaption });
    } else if (quotedMessage.videoMessage) {
      let videoCaption = quotedMessage.videoMessage.caption;
      let videoUrl = await client.downloadAndSaveMediaMessage(quotedMessage);
      client.sendMessage(m.chat, { video: { url: videoUrl }, caption: videoCaption });
    } else {
      return m.reply("Please quote an image or video to save.");
    }
  } else {
    return m.reply("No quoted media found to save. Please quote an image or video.");
  }
};
