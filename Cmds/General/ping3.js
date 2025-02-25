const speed = require("performance-now");

module.exports = async (context) => {
    const { client, m } = context;

    try {
        // Get the current timestamp and calculate Keith's speed
        const timestamp = speed();
        const Keithspeed = speed() - timestamp;

        let fgg = {
            key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: 'status@broadcast' },
            message: {
                contactMessage: {
                    displayName: `Keith`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:Keith\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
                },
            },
        };

        // First, send the fgg message (this only happens once)
        await client.sendMessage(m.chat, fgg);

        // Now send the ping message with the context information
        await client.sendMessage(m.chat, { 
            text: `${Keithspeed.toFixed(4)} m/s`, 
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
        }, { quoted: fgg });

    } catch (error) {
        console.error("Error sending message:", error);
        m.reply('An error occurred while sending the menu.');
    }
};
