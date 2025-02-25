const speed = require("performance-now");

module.exports = async (context) => {
    const { client, m } = context;

    // Get the current timestamp and calculate Keith's speed
    const timestamp = speed();
    const Keithspeed = speed() - timestamp;

    let fgg = {
        key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: 'status@broadcast' },
        message: {
            contactMessage: {
                displayName: `Keith`,
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'Keith'\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
            },
        },
    };

    try {
        // Send the message with the speed data and context info
        await client.sendMessage(m.chat, { 
            text: `𝖐𝖊𝖎𝖙𝖍 𝖘𝖕𝖊𝖊𝖉\n${Keithspeed.toFixed(4)} m/s`, 
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363266249040649@newsletter',
                    newsletterName: 'Keith Support',
                    serverMessageId: 143
                }
            }
        }, { quoted: m });
    } catch (error) {
        console.error("Error sending message:", error);
        m.reply('An error occurred while sending the message.');
    }
};
