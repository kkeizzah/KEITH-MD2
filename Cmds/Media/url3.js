
const { Catbox } = require("node-catbox");
const fs = require('fs-extra');
const { downloadAndSaveMediaMessage } = require('@whiskeysockets/baileys');

// Initialize Catbox
const catbox = new Catbox();

// Function to upload a file to Catbox and return the URL
async function uploadToCatbox(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist");
  }
  try {
    const uploadResult = await catbox.uploadFile({ path: filePath });
    if (uploadResult) {
      return uploadResult;
    } else {
      throw new Error("Error retrieving file link");
    }
  } catch (error) {
    throw new Error(String(error));
  }
}

module.exports = async (context) => {
  const { client, m } = context;

  const quotedMessage = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;

  if (quotedMessage) {
    let filePath;

    if (quotedMessage.imageMessage) {
      filePath = await client.downloadAndSaveMediaMessage(quotedMessage.imageMessage);
    } else if (quotedMessage.videoMessage) {
      filePath = await client.downloadAndSaveMediaMessage(quotedMessage.videoMessage);
    } else if (quotedMessage.stickerMessage) {
      filePath = await client.downloadAndSaveMediaMessage(quotedMessage.stickerMessage);
    } else if (quotedMessage.audioMessage) {
      filePath = await client.downloadAndSaveMediaMessage(quotedMessage.audioMessage);
    } else {
      return m.reply("Please quote an image, video, GIF, sticker, or audio to upload.");
    }

    try {
      const link = await uploadToCatbox(filePath);
      m.reply(`Media Link:\n\n${link}`);
    } catch (error) {
      m.reply('Error uploading media. Please try again later.' + error);
      console.error(error);  // Log any error to the console for debugging
    }
  } else {
    return m.reply("Please quote an image, video, GIF, sticker, or audio to upload.");
  }
};
