const speed = require("performance-now");

module.exports = async (context) => {
    const { client, m } = context;

    // Get the current timestamp and calculate Keith's speed
    const timestamp = speed();
    const Keithspeed = speed() - timestamp;

    try {
        // Prepare the response text with speed data
        const menuText = `𝖐𝖊𝖎𝖙𝖍 𝖘𝖕𝖊𝖊𝖉\n${Keithspeed.toFixed(4)} m/s`;

        // Send message with contextInfo and mention the sender
        await client.sendMessage(m.chat, {
            text: menuText,
            contextInfo: {
                mentionedJid: [m.sender], // Mention the sender
                externalAdReply: {
                    title: "🌟 𝐊𝐄𝐈𝐓𝐇-𝐌𝐃 ✨",
                    body: "𝐫𝐞𝐠𝐚𝐫𝐝𝐬 𝐊𝐞𝐢𝐭𝐡𝐤𝐞𝐢𝐳𝐳𝐚𝐡",
                    sourceUrl: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
                    mediaType: 1,
                    renderLargerThumbnail: false
                }
            }
        });
    } catch (error) {
        console.error("Error sending message:", error);
        m.reply('An error occurred while sending the menu.');
    }
};
